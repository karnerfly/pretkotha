package services

import (
	"context"
	"fmt"
	"io"

	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/enum"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type PostServiceInterface interface {
	GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error)
	GetPopularPosts(ctx context.Context, limit int) ([]*models.Post, error)
	GetAllPosts(ctx context.Context, p *models.GetPostsParam) ([]*models.Post, error)
	GetPostById(ctx context.Context, id string) (*models.Post, error)
	CreateStory(ctx context.Context, id string, req *models.CreatePostPayload) (string, error)
	CreateDrawing(ctx context.Context, id, extension string, req *models.CreatePostPayload, body io.Reader) (string, error)
	UpdatePostThumbnail(ctx context.Context, id, postId, extension string, body io.Reader) error
}

type PostService struct {
	postRepo   repositories.PostRepositoryInterface
	imgUtility utils.ImageUtilityInterface
	config     configs.Config
}

func NewPostService(postRepo repositories.PostRepositoryInterface, u utils.ImageUtilityInterface) *PostService {
	return &PostService{
		postRepo:   postRepo,
		imgUtility: u,
		config:     configs.New(),
	}
}

func (service *PostService) GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.postRepo.GetLatestPosts(dbCtx, limit)
}

func (service *PostService) GetPopularPosts(ctx context.Context, limit int) ([]*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.postRepo.GetPopularPosts(dbCtx, limit)
}

func (service *PostService) GetAllPosts(ctx context.Context, p *models.GetPostsParam) ([]*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.postRepo.GetPosts(dbCtx, p.SortBy, p.FilterBy, p.Page, p.Limit)
}

func (service *PostService) GetPostById(ctx context.Context, id string) (*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return service.postRepo.GetPostById(dbCtx, id)
}

func (service *PostService) CreateStory(ctx context.Context, id string, req *models.CreatePostPayload) (string, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()

	slug := utils.CreateSlug(req.Title)
	req.Kind = string(enum.StoryPostKind)
	return service.postRepo.CreatePost(dbCtx, id, slug, req)
}

func (service *PostService) CreateDrawing(ctx context.Context, id, extension string, req *models.CreatePostPayload, body io.Reader) (string, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()

	pId := utils.GenerateRandomUUID()
	path := fmt.Sprintf("drawings/%s/%s.%s", id, pId, extension)
	err := service.imgUtility.ResizeAndSave(path, 0, 0, 100, body)
	if err != nil {
		return "", err
	}

	slug := utils.CreateSlug(req.Title)
	req.Kind = string(enum.DrawingPostKind)
	url := fmt.Sprintf("%s/static/images/%s", service.config.StaticServerBaseUrl, path)
	req.Content = url

	return service.postRepo.CreatePost(dbCtx, id, slug, req)
}

func (service *PostService) UpdatePostThumbnail(ctx context.Context, id, postId, extension string, body io.Reader) error {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()

	yes, err := service.postRepo.IsPostOfUser(dbCtx, id, postId)
	if err != nil {
		return err
	}

	if !yes {
		return db.ErrRecordNotFound
	}

	path := fmt.Sprintf("thumbnails/%s/%s.%s", id, postId, extension)
	err = service.imgUtility.ResizeAndSave(path, 300, 0, 85, body)
	if err != nil {
		return err
	}

	url := fmt.Sprintf("%s/static/images/%s", service.config.StaticServerBaseUrl, path)
	return service.postRepo.UpdatePostThumbnail(dbCtx, id, postId, url)
}
