package services

import (
	"context"
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
	SendOtp(ctx context.Context, req *models.SendOtpPayload) error
	VerifyOtp(ctx context.Context, req *models.VerifyOtpPayload) error
	Register(ctx context.Context, req *models.CreateUserPayload) error
	Login(ctx context.Context, req *models.LoginUserPayload) (string, string, error)
	Logout(ctx context.Context, sessionId string) error
}

type AuthService struct {
	userRepo    repositories.UserRepositoryInterface
	config      configs.Config
	authSession session.SessionInterface
}

func NewAuthService(userRepo repositories.UserRepositoryInterface, s session.SessionInterface) *AuthService {
	return &AuthService{
		userRepo:    userRepo,
		config:      configs.New(),
		authSession: s,
	}
}

/* returns ErrRecordAlreadyExists if any duplicate record found */
func (service *AuthService) SendOtp(ctx context.Context, req *models.SendOtpPayload) error {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()

	activeUser, err := service.userRepo.IsActiveUser(dbCtx, req.Email)
	if err != nil {
		return err
	}

	if activeUser {
		return db.ErrRecordAlreadyExists
	}

	otp := utils.GenerateRandomNumber()
	key := utils.ConvertToBase64(req.Email)

	sessionCtx, sessionCancle := session.GetIdleTimeoutContext(ctx)
	defer sessionCancle()
	err = service.authSession.Serialize(sessionCtx, key, otp, 1800) // serialize for 30 min
	if err != nil {
		return err
	}

	return mailqueue.Enqueue(mailqueue.TypeOtp, &mailqueue.MailPayload{
		To:   req.Email,
		Data: otp,
	})
}

func (service *AuthService) Register(ctx context.Context, req *models.CreateUserPayload) error {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()

	exists, err := service.userRepo.ExistsByEmail(dbCtx, req.Email)
	if err != nil {
		return err
	}

	if exists {
		return db.ErrRecordAlreadyExists
	}

	req.Hash = utils.HashPassword(req.Hash)

	_, err = service.userRepo.CreateUser(dbCtx, req)
	if err != nil {
		return err
	}

	key := utils.ConvertToBase64(req.Email)
	otp := utils.GenerateRandomNumber()

	sessionCtx, sessionCancle := session.GetIdleTimeoutContext(ctx)
	defer sessionCancle()
	err = service.authSession.Serialize(sessionCtx, key, otp, 1800) // serialize for 30 min
	if err != nil {
		return err
	}

	return mailqueue.Enqueue(mailqueue.TypeOtp, &mailqueue.MailPayload{
		To:   req.Email,
		Data: otp,
	})
}

func (service *AuthService) VerifyOtp(ctx context.Context, req *models.VerifyOtpPayload) error {
	sessionCtx, sessionCancle := session.GetIdleTimeoutContext(ctx)
	defer sessionCancle()

	key := utils.ConvertToBase64(req.Email)

	var otp string
	err := service.authSession.DeSerialize(sessionCtx, key, &otp)
	if err != nil {
		if errors.Is(err, session.Nil) {
			return ErrInvalidOtp
		}
		return err
	}

	if req.Otp != otp {
		return ErrOtpNotMatch
	}

	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	err = service.userRepo.ActivateUser(dbCtx, req.Email)
	if err != nil {
		return err
	}

	return service.authSession.Remove(sessionCtx, key)
}

func (service *AuthService) Login(ctx context.Context, req *models.LoginUserPayload) (string, string, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()

	hash := utils.HashPassword(req.Hash)

	id, err := service.userRepo.SearchUserByEmailPassword(dbCtx, req.Email, hash)
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
		"expires_at": time.Now().Add(time.Duration(service.config.JwtExpiry) * time.Second).Unix(),
	}

	sessionCtx, sessionCancle := session.GetIdleTimeoutContext(ctx)
	defer sessionCancle()
	err = service.authSession.Serialize(sessionCtx, sessionId, data, service.config.SessionCookieExpiry)
	if err != nil {
		return "", "", err
	}

	return token, sessionId, nil
}

func (service *AuthService) Logout(ctx context.Context, sessionId string) error {
	sessionCtx, cancle := session.GetIdleTimeoutContext(ctx)
	defer cancle()
	return service.authSession.Remove(sessionCtx, sessionId)
}
