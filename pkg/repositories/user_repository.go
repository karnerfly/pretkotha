package repositories

import (
	"context"
	"database/sql"
	"errors"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type UserRepositoryInterface interface {
	CreateUser(ctx context.Context, user *models.CreateUserPayload) (string, error)
	ActivateUser(ctx context.Context, email string) error
	IsActiveUser(ctx context.Context, email string) (bool, error)
	GetUserById(ctx context.Context, id string) (*models.User, error)
	ExistsByEmail(ctx context.Context, email string) (bool, error)
	SearchUserByEmailPassword(ctx context.Context, email, password string) (string, error)
}

type UserRepo struct {
	client *sql.DB
}

func NewUserRepo(client *sql.DB) *UserRepo {
	return &UserRepo{client}
}

func (r *UserRepo) CreateUser(ctx context.Context, req *models.CreateUserPayload) (string, error) {
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

	stmt2, err := tx.PrepareContext(ctx, `INSERT INTO user_profiles (user_id, bio, phone) VALUES ($1, $2, $3);`)
	if err != nil {
		return "", err
	}
	defer stmt2.Close()

	if _, err = stmt2.ExecContext(ctx, id, req.Bio, req.Phone); err != nil {
		return "", nil
	}

	if err = tx.Commit(); err != nil {
		return "", err
	}

	return id, nil
}

func (r *UserRepo) ActivateUser(ctx context.Context, email string) error {
	tx, err := r.client.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	stmt, err := tx.PrepareContext(ctx, `UPDATE users SET verified = TRUE WHERE email = $1;`)
	if err != nil {
		return err
	}

	_, err = stmt.ExecContext(ctx, email)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (r *UserRepo) IsActiveUser(ctx context.Context, email string) (bool, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT verified FROM users WHERE email = $1;`)
	if err != nil {
		return false, err
	}

	var active bool
	err = stmt.QueryRowContext(ctx, email).Scan(&active)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return false, db.ErrRecordNotFound
		} else {
			return false, err
		}
	}

	return active, nil
}

func (r *UserRepo) GetUserById(ctx context.Context, id string) (*models.User, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT u.id, u.user_name, u.email,u.verified, u.is_banned, u.banned_at, u.created_at, u.updated_at, up.bio, up.role, up.avatar_url, up.phone FROM users AS u LEFT JOIN user_profiles AS up ON u.id = up.user_id WHERE u.is_banned=FALSE AND u.id=$1;`)
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

	err = stmt.QueryRowContext(ctx, id).Scan(&user.ID, &user.UserName, &user.Email, &user.Verified, &user.IsBanned, &bannedat, &user.CreatedAt, &user.UpdatedAt, &bio, &user.Profile.Role, &avatarurl, &phone)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, db.ErrRecordNotFound
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

func (r *UserRepo) SearchUserByEmailPassword(ctx context.Context, email, password string) (string, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT id FROM users WHERE email = $1 AND password_hash = $2;`)
	if err != nil {
		return "", err
	}

	var id string
	err = stmt.QueryRowContext(ctx, email, password).Scan(&id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return "", db.ErrRecordNotFound
		} else {
			return "", err
		}
	}

	return id, nil
}
