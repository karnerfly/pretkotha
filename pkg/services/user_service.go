package services

import (
	"database/sql"
	"errors"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/enum/dberr"
	"github.com/karnerfly/pretkotha/pkg/enum/httperr"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
)

type UserServiceInterface interface {
	Register(req *models.CreateUserRequest) error
	Login(req *models.LoginUserRequest) error
}

type UserService struct {
	userRepo repositories.UserRepositoryInterface
}

func NewUserService(client *sql.DB) *UserService {
	return &UserService{
		userRepo: repositories.NewUserRepo(client),
	}
}

func (s *UserService) Register(req *models.CreateUserRequest) error {
	ctx, cancle := db.GetIdleTimeoutContext()
	defer cancle()

	_, err := s.userRepo.CreateUser(ctx, req)
	if err != nil {
		if errors.Is(err, dberr.ErrRecordAlreadyExists) {
			return httperr.ErrConflict
		} else {
			return httperr.ErrInternalServer
		}
	}

	return nil
}

func (s *UserService) Login(req *models.LoginUserRequest) error {
	return nil
}
