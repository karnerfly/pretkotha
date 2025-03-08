package services

import (
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/repositories"
)

type PostServiceInterface interface {
	GetLatestPosts(limit int) ([]*models.Post, error)
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
