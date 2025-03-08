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

func (s *PostService) GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return s.postRepo.GetLatestPosts(dbCtx, limit)
}

func (s *PostService) GetPopularPosts(ctx context.Context, limit int) ([]*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return s.postRepo.GetPopularPosts(dbCtx, limit)
}

func (s *PostService) GetAllPosts(ctx context.Context, p *models.GetPostsParam) ([]*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return s.postRepo.GetPosts(dbCtx, p.SortBy, p.FilterBy, p.Page, p.Limit)
}

func (s *PostService) GetPostById(ctx context.Context, id string) (*models.Post, error) {
	dbCtx, dbCancle := db.GetIdleTimeoutContext(ctx)
	defer dbCancle()
	return s.postRepo.GetPostById(dbCtx, id)
}
