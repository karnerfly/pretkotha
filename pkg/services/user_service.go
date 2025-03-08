package services

import (
	"context"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
)

type UserServiceInterface interface {
	GetUser(ctx context.Context, id string) (*models.User, error)
}

type UserService struct {
	userRepo repositories.UserRepositoryInterface
}

func NewUserService(userRepo repositories.UserRepositoryInterface) *UserService {
	return &UserService{userRepo}
}

func (s *UserService) GetUser(ctx context.Context, id string) (*models.User, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return s.userRepo.GetUserById(dbCtx, id)
}
