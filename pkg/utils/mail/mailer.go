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
	Mail(to []string, body []byte) error
	SendOtpMail(to, otp string) error
}

type MailError error

var (
	ErrTimeOut MailError = errors.New("timeout error")
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

func (s *MailService) Mail(ctx context.Context, to []string, body []byte) error {
	errChan := make(chan error)

	go func() {
		auth := smtp.PlainAuth("", s.Option.SmtpUsername, s.Option.SmtpPassword, s.Option.SmtpHost)
		err := smtp.SendMail(s.Option.SmtpServerAddr, auth, s.Option.SmtpUsername, to, body)
		if err != nil {
			errChan <- err
			return
		}
		errChan <- nil
	}()

	select {
	case err := <-errChan:
		return err
	case <-ctx.Done():
		return ErrTimeOut
	}
}

func (s *MailService) SendOtpMail(ctx context.Context, to, otp string) error {
	body := s.getOtpTemplate(to, otp)

	attempAfter := 1
	after := time.After(time.Duration(attempAfter) * time.Second)

	for {
		<-after
		err := s.Mail(ctx, []string{to}, body)
		if !errors.Is(err, ErrTimeOut) {
			return err
		}

		attempAfter *= 2
		after = time.After(time.Duration(attempAfter) * time.Second)
		logger.Errorf("Timout Happend, try again after %ds [TO: %s]\n", attempAfter, to)
	}
}
