package services

import (
	"context"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
)

type PostServiceInterface interface {
	GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error)
	GetPopularPosts(ctx context.Context, limit int) ([]*models.Post, error)
	GetAllPosts(ctx context.Context, p *models.GetPostsParam) ([]*models.Post, error)
	GetPostById(ctx context.Context, id string) (*models.Post, error)
}

type PostService struct {
	postRepo repositories.PostRepositoryInterface
}

func NewPostService(postRepo repositories.PostRepositoryInterface) *PostService {
	return &PostService{postRepo}
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
