package services

import (
	"errors"
	"time"

	"github.com/karnerfly/pretkotha/pkg/configs"
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
	Login(req *models.LoginUserPayload) (string, string, error)
}

type AuthService struct {
	userRepo repositories.UserRepositoryInterface
	config   *configs.Config
}

func NewAuthService(userRepo repositories.UserRepositoryInterface) *AuthService {
	return &AuthService{
		userRepo: userRepo,
		config:   configs.New(),
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
		}
		return err
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

func (s *AuthService) Login(req *models.LoginUserPayload) (string, string, error) {
	hash := utils.HashPassword(req.Hash)

	ctx, cancle := db.GetIdleTimeoutContext()
	defer cancle()
	id, err := s.userRepo.SearchUserByEmailPassword(ctx, req.Email, hash)
	if err != nil {
		return "", "", err
	}

	token := utils.GenerateJwtToken(id)
	sessionId, err := utils.GenerateUrlEncodedToken(24)
	if err != nil {
		return "", "", err
	}

	data := map[string]any{
		"token":      token,
		"created_at": time.Now().Unix(),
		"expires_at": time.Now().Add(s.config.JwtExpiry).Unix(),
	}

	sctx, sc := session.GetIdleTimeoutContext()
	defer sc()
	err = session.Serialize(sctx, sessionId, data, 30*24*time.Hour)
	if err != nil {
		return "", "", err
	}

	return token, sessionId, nil
}
