package services

import (
	"context"
	"fmt"
	"io"
	"strings"

	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserServiceInterface interface {
	GetUser(ctx context.Context, id string) (*models.User, error)
	UploadAvatar(ctx context.Context, id, extension string, body io.Reader) error
	DeleteAvatar(ctx context.Context, id string) error
	UpdateUserProfile(ctx context.Context, id string, req *models.UpdateUserPayload) error
	GetUserRole(ctx context.Context, id string) (string, error)
}

type UserService struct {
	userRepo   repositories.UserRepositoryInterface
	config     configs.Config
	imgUtility utils.ImageUtilityInterface
}

func NewUserService(userRepo repositories.UserRepositoryInterface, u utils.ImageUtilityInterface) *UserService {
	return &UserService{
		userRepo:   userRepo,
		config:     configs.New(),
		imgUtility: u,
	}
}

func (service *UserService) GetUser(ctx context.Context, id string) (*models.User, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.userRepo.GetUserById(dbCtx, id)
}

func (service *UserService) UploadAvatar(ctx context.Context, id, extension string, body io.Reader) error {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()

	path := fmt.Sprintf("avatars/%s.%s", id, extension)
	err := service.imgUtility.ResizeAndSave(path, 200, 0, 60, body)
	if err != nil {
		return err
	}

	url := fmt.Sprintf("%s/static/images/%s", service.config.StaticServerBaseUrl, path)
	return service.userRepo.UpdateUserAvatar(dbCtx, id, url)
}

func (service *UserService) DeleteAvatar(ctx context.Context, id string) error {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	oldAvatarUrl, err := service.userRepo.DeleteUserAvatar(dbCtx, id)
	if err != nil {
		return err
	}

	prefix := fmt.Sprintf("%s/static/images/", service.config.StaticServerBaseUrl)
	if oldAvatarUrl != "" {
		path := strings.TrimPrefix(oldAvatarUrl, prefix)
		err := service.imgUtility.Remove(path)
		if err != nil {
			return err
		}
	}

	return nil
}

func (service *UserService) UpdateUserProfile(ctx context.Context, id string, req *models.UpdateUserPayload) error {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.userRepo.UpdateUserProfile(dbCtx, id, req)
}

func (service *UserService) GetUserRole(ctx context.Context, id string) (string, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.userRepo.GetUserRole(dbCtx, id)
}
