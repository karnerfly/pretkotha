package repositories

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/karnerfly/pretkotha/pkg/enum"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type PostRepositoryInterface interface {
	GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error)
	GetPosts(ctx context.Context, filter enum.Filter, page, limit int) ([]*models.Post, error)
}

type PostRepository struct {
	client *sql.DB
}

func NewPostRepo(client *sql.DB) *PostRepository {
	return &PostRepository{client}
}

func (r *PostRepository) GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT p.id, p.title, p.slug, p.description, p.thumbnail, p.kind, p.category, p.created_at, p.updated_at, COUNT (l.liked_on) as likes FROM posts as p LEFT JOIN likes as l ON p.id = l.liked_on GROUP BY p.id ORDER BY p.created_at DESC LIMIT $1;`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.QueryContext(ctx, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return getPostsFromRow(rows)
}

func (r *PostRepository) GetPosts(ctx context.Context, filter enum.Filter, page, limit int) ([]*models.Post, error) {
	var orderBy string
	switch filter {
	case enum.PostFilterNewest:
		orderBy = "ORDER BY p.created_at DESC"
	case enum.PostFilterOldest:
		orderBy = "ORDER BY p.created_at ASC"
	case enum.PostFilterMostPopular:
		orderBy = "ORDER BY likes DESC"
	default:
		orderBy = "ORDER BY p.created_at DESC"
	}

	query := fmt.Sprintf(`SELECT p.id, p.title, p.slug, p.description, p.thumbnail, p.kind, p.category, p.created_at, p.updated_at, COUNT (l.liked_on) as likes FROM posts as p LEFT JOIN likes as l ON p.id = l.liked_on GROUP BY p.id %s offset $1 LIMIT $2;`, orderBy)

	stmt, err := r.client.PrepareContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	offset := (page - 1) * limit
	rows, err := stmt.QueryContext(ctx, offset, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return getPostsFromRow(rows)
}

func getPostsFromRow(rows *sql.Rows) ([]*models.Post, error) {
	var (
		posts       = make([]*models.Post, 0)
		thumbnail   sql.NullString
		description sql.NullString
	)

	for rows.Next() {
		post := models.NewPost()
		err := rows.Scan(&post.ID, &post.Title, &post.Slug, &description, &thumbnail, &post.Kind, &post.Category, &post.CreatedAt, &post.UpdatedAt, &post.Likes)
		if err != nil {
			return nil, err
		}

		post.Thumbnail = thumbnail.String
		post.Description = description.String
		posts = append(posts, post)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return posts, nil
}
