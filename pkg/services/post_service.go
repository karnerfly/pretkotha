package services

import (
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
)

type PostServiceInterface interface {
	GetLatestPosts(limit int) ([]*models.Post, error)
	GetPopularPosts(limit int) ([]*models.Post, error)
	GetPostById(id string) (*models.Post, error)
}

type PostService struct {
	postRepo repositories.PostRepositoryInterface
}

func NewPostService(postRepo repositories.PostRepositoryInterface) *PostService {
	return &PostService{postRepo}
}

func (s *PostService) GetLatestPosts(limit int) ([]*models.Post, error) {
	ctx, cancle := db.GetIdleTimeoutContext()
	defer cancle()

	return s.postRepo.GetLatestPosts(ctx, limit)
}

func (s *PostService) GetPopularPosts(limit int) ([]*models.Post, error) {
	ctx, cancle := db.GetIdleTimeoutContext()
	defer cancle()

	return s.postRepo.GetPopularPosts(ctx, limit)
}

func (s *PostService) GetPostById(id string) (*models.Post, error) {
	ctx, cancle := db.GetIdleTimeoutContext()
	defer cancle()

	return s.postRepo.GetPostById(ctx, id)
}
