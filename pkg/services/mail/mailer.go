package mail

import (
	"context"
	"errors"
	"html/template"
	"net/smtp"
	"time"

	"github.com/karnerfly/pretkotha/pkg/logger"
)

type Mailer interface {
	SendOtpMail(to, otp string) error
}

type MailError error

var (
	ErrTimeOut      MailError = errors.New("timeout error")
	ErrExceedMaxTry MailError = errors.New("exceeds the max try for sending mail")
)

type Option struct {
	SmtpUsername   string
	SmtpPassword   string
	SmtpHost       string
	SmtpServerAddr string
	From           string
}

type MailService struct {
	Option    Option
	Templates map[string]*template.Template
}

func NewMailService(opt Option) *MailService {
	return &MailService{
		Option:    opt,
		Templates: make(map[string]*template.Template),
	}
}

func (s *MailService) mail(ctx context.Context, to []string, body []byte) error {
	errChan := make(chan error, 1)

	go func() {
		auth := smtp.PlainAuth("", s.Option.SmtpUsername, s.Option.SmtpPassword, s.Option.SmtpHost)
		err := smtp.SendMail(s.Option.SmtpServerAddr, auth, s.Option.SmtpUsername, to, body)
		errChan <- err
		close(errChan)
	}()

	select {
	case err := <-errChan:
		return err
	case <-ctx.Done():
		return ErrTimeOut
	}
}

func (s *MailService) SendOtpMail(ctx context.Context, to, otp string) error {
	body, err := s.getOtpTemplate(to, otp)
	if err != nil {
		return err
	}

	attempAfter := 1
	remainingTry := 3
	after := time.After(time.Duration(attempAfter) * time.Second)

	for {
		if remainingTry <= 0 {
			return ErrExceedMaxTry
		}

		<-after
		err := s.mail(ctx, []string{to}, body)
		if !errors.Is(err, ErrTimeOut) {
			return err
		}

		attempAfter *= 2
		remainingTry--
		after = time.After(time.Duration(attempAfter) * time.Second)
		logger.Errorf("Timout Happend, try again after %ds [TO: %s]\n", attempAfter, to)
	}
}
