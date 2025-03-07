package services

import (
	"errors"
	"time"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/queue/mailqueue"
	"github.com/karnerfly/pretkotha/pkg/repositories"
	"github.com/karnerfly/pretkotha/pkg/session"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type AuthServiceError error

var (
	ErrOtpNotMatch = errors.New("otp not match")
	ErrInvalidOtp  = errors.New("invalid otp")
)

type AuthServiceInterface interface {
	SendOtp(req *models.SendOtpPayload) error
	VerifyOtp(req *models.VerifyOtpPayload) error
	Register(req *models.CreateUserPayload) error
	Login(req *models.LoginUserPayload) error
}

type AuthService struct {
	userRepo repositories.UserRepositoryInterface
}

func NewAuthService(userRepo repositories.UserRepositoryInterface) *AuthService {
	return &AuthService{
		userRepo: userRepo,
	}
}

/* returns ErrRecordAlreadyExists if any duplicate record found */
func (s *AuthService) SendOtp(req *models.SendOtpPayload) error {
	dctx, dcancle := db.GetIdleTimeoutContext()
	defer dcancle()

	activeUser, err := s.userRepo.IsActiveUser(dctx, req.Email)
	if err != nil {
		return err
	}

	if activeUser {
		return db.ErrRecordAlreadyExists
	}

	otp := utils.GenerateRandomNumber()
	key := utils.ConvertToBase64(req.Email)

	sctx, sc := session.GetIdleTimeoutContext()
	defer sc()
	err = session.Serialize(sctx, key, otp, time.Hour)
	if err != nil {
		return err
	}

	return mailqueue.Enqueue(mailqueue.TypeOtp, &mailqueue.MailPayload{
		To:   req.Email,
		Data: otp,
	})
}

func (s *AuthService) Register(req *models.CreateUserPayload) error {
	dctx, dcancle := db.GetIdleTimeoutContext()
	defer dcancle()

	exists, err := s.userRepo.ExistsByEmail(dctx, req.Email)
	if err != nil {
		return err
	}

	if exists {
		return db.ErrRecordAlreadyExists
	}

	req.Hash = utils.HashPassword(req.Hash)

	_, err = s.userRepo.CreateUser(dctx, req)
	if err != nil {
		return err
	}

	key := utils.ConvertToBase64(req.Email)
	otp := utils.GenerateRandomNumber()

	sctx, sc := session.GetIdleTimeoutContext()
	defer sc()
	err = session.Serialize(sctx, key, otp, time.Hour)
	if err != nil {
		return err
	}

	return mailqueue.Enqueue(mailqueue.TypeOtp, &mailqueue.MailPayload{
		To:   req.Email,
		Data: otp,
	})
}

func (s *AuthService) VerifyOtp(req *models.VerifyOtpPayload) error {
	key := utils.ConvertToBase64(req.Email)
	sctx, sc := session.GetIdleTimeoutContext()
	defer sc()

	var otp string
	err := session.DeSerialize(sctx, key, &otp)
	if err != nil {
		if errors.Is(err, session.Nil) {
			return ErrInvalidOtp
		} else {
			return err
		}
	}

	if req.Otp != otp {
		return ErrOtpNotMatch
	}

	dctx, dcancle := db.GetIdleTimeoutContext()
	defer dcancle()
	err = s.userRepo.ActivateUser(dctx, req.Email)
	if err != nil {
		return err
	}

	return session.Remove(sctx, key)
}

func (s *AuthService) Login(req *models.LoginUserPayload) error {
	return nil
}
