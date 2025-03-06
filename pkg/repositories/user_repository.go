package repositories

import (
	"context"
	"database/sql"
	"errors"

	"github.com/karnerfly/pretkotha/pkg/enum/dberr"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type UserRepositoryInterface interface {
	CreateUser(ctx context.Context, user *models.CreateUserRequest) (string, error)
	GetUserById(ctx context.Context, id string) (*models.User, error)
	ExistsByEmail(ctx context.Context, email string) (bool, error)
}

type UserRepo struct {
	client *sql.DB
}

func NewUserRepo(client *sql.DB) *UserRepo {
	return &UserRepo{client}
}

func (r *UserRepo) CreateUser(ctx context.Context, req *models.CreateUserRequest) (string, error) {
	tx, err := r.client.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	stmt, err := tx.PrepareContext(ctx, `INSERT INTO users (user_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id;`)
	if err != nil {
		return "", err
	}
	defer stmt.Close()

	var id string
	if err = stmt.QueryRowContext(ctx, req.UserName, req.Email, req.Hash).Scan(&id); err != nil {
		return "", err
	}

	stmt2, err := tx.PrepareContext(ctx, `INSERT INTO user_profiles (user_id, avatar_url, bio, phone) VALUES ($1, $2, $3, $4)`)
	if err != nil {
		return "", err
	}
	defer stmt2.Close()

	if _, err = stmt2.ExecContext(ctx, id, req.AvatarUrl, req.Bio, req.Phone); err != nil {
		return "", nil
	}

	if err = tx.Commit(); err != nil {
		return "", err
	}

	return id, nil
}

func (r *UserRepo) GetUserById(ctx context.Context, id string) (*models.User, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT u.id, u.user_name, u.email,u.is_banned, u.banned_at, u.created_at, u.updated_at, up.bio, up.avatar_url, up.phone FROM users AS u LEFT JOIN user_profiles AS up ON u.id = up.user_id WHERE u.is_banned=FALSE AND u.id=$1;`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var (
		user      = models.NewUser()
		bannedat  sql.NullString
		bio       sql.NullString
		avatarurl sql.NullString
		phone     sql.NullString
	)

	err = stmt.QueryRowContext(ctx, id).Scan(&user.ID, &user.UserName, &user.Email, &user.IsBanned, &bannedat, &user.CreatedAt, &user.UpdatedAt, &bio, &avatarurl, &phone)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, dberr.ErrRecordNotFound
		} else {
			return nil, err
		}
	}

	user.BannedAt = bannedat.String
	user.Profile.Bio = bio.String
	user.Profile.AvatarUrl = avatarurl.String
	user.Profile.Phone = phone.String

	return user, nil
}

func (r *UserRepo) ExistsByEmail(ctx context.Context, email string) (bool, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT EXISTS(SELECT 1 FROM users WHERE users.email = $1);`)
	if err != nil {
		return false, err
	}
	defer stmt.Close()

	var exists bool
	err = stmt.QueryRowContext(ctx, email).Scan(&exists)
	if err != nil {
		return false, err
	}

	return exists, nil
}
