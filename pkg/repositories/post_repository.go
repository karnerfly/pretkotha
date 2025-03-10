package repositories

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/enum"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type PostRepositoryInterface interface {
	GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error)
	GetPopularPosts(ctx context.Context, limit int) ([]*models.Post, error)
	GetPosts(ctx context.Context, sort enum.Sort, filter enum.Filter, page, limit int) ([]*models.Post, error)
	GetPostById(ctx context.Context, id string) (*models.Post, error)
	CreatePost(ctx context.Context, postBy, slug string, req *models.CreatePostPayload) (string, error)
	IsPostOfUser(ctx context.Context, id, postId string) (bool, error)
	UpdatePostThumbnail(ctx context.Context, id, postId, url string) error
}

type PostRepository struct {
	client *sql.DB
}

func NewPostRepo(client *sql.DB) *PostRepository {
	return &PostRepository{client}
}

func (r *PostRepository) GetLatestPosts(ctx context.Context, limit int) ([]*models.Post, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT p.id, p.title, p.slug, p.description, p.thumbnail, p.kind, p.category, p.is_deleted, p.created_at, p.updated_at, COUNT (l.liked_on) as likes FROM posts as p LEFT JOIN likes as l ON p.id = l.liked_on WHERE is_deleted = FALSE GROUP BY p.id ORDER BY p.created_at DESC LIMIT $1;`)
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

func (r *PostRepository) GetPopularPosts(ctx context.Context, limit int) ([]*models.Post, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT p.id, p.title, p.slug, p.description, p.thumbnail, p.kind, p.category, p.is_deleted, p.created_at, p.updated_at, COUNT (l.liked_on) as likes FROM posts as p LEFT JOIN likes as l ON p.id = l.liked_on WHERE is_deleted = FALSE GROUP BY p.id ORDER BY likes DESC LIMIT $1;`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.QueryContext(ctx, limit)
	if err != nil {
		return nil, err
	}

	posts, err := getPostsFromRow(rows)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func (r *PostRepository) GetPosts(ctx context.Context, sort enum.Sort, filter enum.Filter, page, limit int) ([]*models.Post, error) {
	var orderBy string
	switch sort {
	case enum.PostSortNewest:
		orderBy = "ORDER BY p.created_at DESC"
	case enum.PostSortOldest:
		orderBy = "ORDER BY p.created_at ASC"
	case enum.PostSortMostPopular:
		orderBy = "ORDER BY likes DESC"
	default:
		return nil, fmt.Errorf("invalid sort parameter")
	}

	var filterBy string
	switch filter {
	case enum.PostFilterStory:
		filterBy = "WHERE p.kind = 'story'"
	case enum.PostFilterDrawing:
		filterBy = "WHERE p.kind = 'drawing'"
	case enum.PostFilterAll:
		filterBy = "WHERE 1 = 1"
	default:
		return nil, fmt.Errorf("invalid filter parameter")
	}

	query := fmt.Sprintf(`SELECT p.id, p.title, p.slug, p.description, p.thumbnail, p.kind, p.category, p.is_deleted, p.created_at, p.updated_at, COUNT (l.liked_on) as likes FROM posts as p LEFT JOIN likes as l ON p.id = l.liked_on %s AND is_deleted = FALSE GROUP BY p.id %s offset $1 LIMIT $2;`, filterBy, orderBy)

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

func (r *PostRepository) GetPostById(ctx context.Context, id string) (*models.Post, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT p.id, p.title, p.slug, p.description, p.thumbnail, p.kind, p.category, p.is_deleted, p.created_at, p.updated_at, u.user_name, up.avatar_url, COUNT(l.liked_on) AS likes FROM posts AS p LEFT JOIN users AS u ON p.post_by = u.id LEFT JOIN user_profiles AS up ON u.id = up.user_id LEFT JOIN likes AS l ON l.liked_on = p.id WHERE p.id = $1 AND is_deleted = FALSE GROUP BY p.id, u.user_name, up.avatar_url;`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var (
		post        = models.NewPost()
		thumbnail   sql.NullString
		description sql.NullString
	)
	post.PostBy = &models.StoryUser{}

	err = stmt.QueryRowContext(ctx, id).Scan(&post.ID, &post.Title, &post.Slug, &description, &thumbnail, &post.Kind, &post.Category, &post.IsDeleted, &post.CreatedAt, &post.UpdatedAt, &post.PostBy.UserName, &post.PostBy.AvatarUrl, &post.Likes)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, db.ErrRecordNotFound
		}

		return nil, err
	}

	post.Thumbnail = thumbnail.String
	post.Description = description.String

	return post, nil
}

func (r *PostRepository) CreatePost(ctx context.Context, postBy, slug string, req *models.CreatePostPayload) (string, error) {
	tx, err := r.client.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	stmt, err := tx.PrepareContext(ctx, `INSERT INTO posts (slug, title, description, content, kind, category, post_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`)
	if err != nil {
		return "", err
	}
	defer stmt.Close()

	var id string
	err = stmt.QueryRowContext(ctx, slug, req.Title, req.Description, req.Content, req.Kind, req.Category, postBy).Scan(&id)
	if err != nil {
		return "", err
	}

	err = tx.Commit()
	if err != nil {
		return "", err
	}

	return id, nil
}

func (r *PostRepository) IsPostOfUser(ctx context.Context, id, postId string) (bool, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT EXISTS(SELECT 1 FROM posts WHERE id = $1 AND post_by = $2 AND is_deleted = FALSE);`)
	if err != nil {
		return false, err
	}
	defer stmt.Close()

	var exists bool
	err = stmt.QueryRowContext(ctx, postId, id).Scan(&exists)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (r *PostRepository) UpdatePostThumbnail(ctx context.Context, id, postId, url string) error {
	tx, err := r.client.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	stmt, err := tx.PrepareContext(ctx, `UPDATE posts SET thumbnail = $1 WHERE id = $2 AND post_by = $3;`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, url, postId, id)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func getPostsFromRow(rows *sql.Rows) ([]*models.Post, error) {
	defer rows.Close()

	var (
		posts       = make([]*models.Post, 0)
		thumbnail   sql.NullString
		description sql.NullString
	)

	for rows.Next() {
		post := models.NewPost()
		err := rows.Scan(&post.ID, &post.Title, &post.Slug, &description, &thumbnail, &post.Kind, &post.Category, &post.IsDeleted, &post.CreatedAt, &post.UpdatedAt, &post.Likes)
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
