package repositories

import (
	"context"
	"database/sql"
	"errors"

	"github.com/karnerfly/pretkotha/pkg/enum"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type UserRepositoryInterface interface {
	GetUserById(ctx context.Context, id string) (*models.User, error)
	ExistsByEmail(ctx context.Context, email string) (bool, error)
}

type UserRepo struct {
	client *sql.DB
}

func NewUserRepo(client *sql.DB) *UserRepo {
	return &UserRepo{client}
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
			return nil, enum.ErrRecordNotFound
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

	var emailExists bool
	err = stmt.QueryRowContext(ctx, email).Scan(&emailExists)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, enum.ErrRecordNotFound
		} else {
			return false, err
		}
	}

	return emailExists, nil
}
