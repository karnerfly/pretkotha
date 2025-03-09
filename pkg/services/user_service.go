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
}

type UserService struct {
	userRepo   repositories.UserRepositoryInterface
	config     configs.Config
	imgUtility utils.ImageUtilityInterface
}

func NewUserService(userRepo repositories.UserRepositoryInterface, imgUtility utils.ImageUtilityInterface) *UserService {
	return &UserService{
		userRepo:   userRepo,
		config:     configs.New(),
		imgUtility: imgUtility,
	}
}

func (service *UserService) GetUser(ctx context.Context, id string) (*models.User, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.userRepo.GetUserById(dbCtx, id)
}

func (service *UserService) UploadAvatar(ctx context.Context, id, extension string, body io.Reader) error {
	path := fmt.Sprintf("avatars/%s.%s", id, extension)
	err := service.imgUtility.ResizeAndSave(path, 200, 0, body)
	if err != nil {
		return err
	}

	url := fmt.Sprintf("%s/static/images/%s", service.config.StaticServerBaseUrl, path)

	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.userRepo.UpdateUserAvatar(dbCtx, id, url)
}

func (service *UserService) DeleteAvatar(ctx context.Context, id string) error {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	avatar_url, err := service.userRepo.DeleteUserAvatar(dbCtx, id)
	if err != nil {
		return err
	}

	prefix := fmt.Sprintf("%s/static/images/", service.config.StaticServerBaseUrl)
	if avatar_url != "" {
		path := strings.TrimPrefix(avatar_url, prefix)
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
