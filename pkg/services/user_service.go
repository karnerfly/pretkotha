package services

import (
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
)

type UserServiceInterface interface {
	GetUser(id string) (*models.User, error)
}

type UserService struct {
	userRepo repositories.UserRepositoryInterface
}

func NewUserService(userRepo repositories.UserRepositoryInterface) *UserService {
	return &UserService{userRepo}
}

func (s *UserService) GetUser(id string) (*models.User, error) {
	ctx, cancle := db.GetIdleTimeoutContext()
	defer cancle()
	return s.userRepo.GetUserById(ctx, id)
}
