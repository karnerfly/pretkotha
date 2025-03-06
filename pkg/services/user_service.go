package services

import (
	"fmt"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserServiceInterface interface {
	Register(req *models.CreateUserPayload) (string, error)
	Login(req *models.LoginUserPayload) error
}

type UserService struct {
	userRepo repositories.UserRepositoryInterface
}

func NewUserService(userRepo repositories.UserRepositoryInterface) *UserService {
	return &UserService{
		userRepo: userRepo,
	}
}

/* returns ErrRecordAlreadyExists if any duplicate record found */
func (s *UserService) Register(req *models.CreateUserPayload) (string, error) {
	ctx, cancle := db.GetIdleTimeoutContext()
	defer cancle()

	exists, err := s.userRepo.ExistsByEmail(ctx, req.Email)
	if err != nil {
		return "", err
	}

	if exists {
		return "", db.ErrRecordAlreadyExists
	}

	hash := utils.HashPassword(req.Hash)

	id, err := s.userRepo.CreateUser(ctx, req)
	if err != nil {
		return "", err
	}

	otp := utils.GenerateRandomNumber()
	sessionToken := utils.ConvertToBase64(id)

	fmt.Println(otp, hash, sessionToken)

	return sessionToken, nil
}

func (s *UserService) Login(req *models.LoginUserPayload) error {
	return nil
}
