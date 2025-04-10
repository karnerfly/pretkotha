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
	UpdateUserAvatar(ctx context.Context, id, url string) error
	DeleteUserAvatar(ctx context.Context, id string) (string, error)
	UpdateUserProfile(ctx context.Context, id string, user *models.UpdateUserPayload) error
	GetUserRole(ctx context.Context, id string) (string, error)
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

	stmt1, err := tx.PrepareContext(ctx, `INSERT INTO users (user_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id;`)
	if err != nil {
		return "", err
	}
	defer stmt1.Close()

	var id string
	if err = stmt1.QueryRowContext(ctx, req.UserName, req.Email, req.Hash).Scan(&id); err != nil {
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

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	stmt, err := tx.PrepareContext(ctx, `UPDATE users SET verified = TRUE WHERE email = $1;`)
	if err != nil {
		return err
	}
	defer stmt.Close()

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
	defer stmt.Close()

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
	stmt, err := r.client.PrepareContext(ctx, `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1);`)
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
	defer stmt.Close()

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

func (r *UserRepo) UpdateUserAvatar(ctx context.Context, id, url string) error {
	tx, err := r.client.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	stmt, err := tx.PrepareContext(ctx, `UPDATE user_profiles SET avatar_url = $1 WHERE user_id = $2;`)
	if err != nil {
		return err
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, url, id)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (r *UserRepo) DeleteUserAvatar(ctx context.Context, id string) (string, error) {
	tx, err := r.client.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	stmt1, err := tx.PrepareContext(ctx, `SELECT avatar_url FROM user_profiles WHERE user_id = $1;`)
	if err != nil {
		return "", err
	}
	defer stmt1.Close()

	var oldAvatarUrl sql.NullString
	err = stmt1.QueryRowContext(ctx, id).Scan(&oldAvatarUrl)
	if err != nil {
		return "", err
	}

	stmt2, err := tx.PrepareContext(ctx, `UPDATE user_profiles SET avatar_url = '' WHERE user_id = $1;`)
	if err != nil {
		return "", err
	}
	defer stmt2.Close()

	_, err = stmt2.ExecContext(ctx, id)
	if err != nil {
		return "", err
	}

	err = tx.Commit()
	if err != nil {
		return "", nil
	}

	return oldAvatarUrl.String, nil
}

func (r *UserRepo) UpdateUserProfile(ctx context.Context, id string, user *models.UpdateUserPayload) error {
	tx, err := r.client.BeginTx(ctx, nil)
	if err != nil {
		return err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	stmt1, err := tx.PrepareContext(ctx, `UPDATE users SET user_name = COALESCE(NULLIF($1, ''), user_name) WHERE id = $2;`)
	if err != nil {
		return err
	}
	defer stmt1.Close()

	_, err = stmt1.ExecContext(ctx, user.UserName, id)
	if err != nil {
		return err
	}

	stmt2, err := tx.PrepareContext(ctx, `UPDATE user_profiles SET bio = COALESCE(NULLIF($1, ''), bio), phone = COALESCE(NULLIF($2, ''), phone) WHERE user_id = $3;`)
	if err != nil {
		return err
	}
	defer stmt2.Close()

	_, err = stmt2.ExecContext(ctx, user.Bio, user.Phone, id)
	if err != nil {
		return err
	}

	return tx.Commit()
}

func (r *UserRepo) GetUserRole(ctx context.Context, id string) (string, error) {
	stmt, err := r.client.PrepareContext(ctx, `SELECT role FROM user_profiles WHERE user_id = $1;`)
	if err != nil {
		return "", err
	}
	defer stmt.Close()

	var role string
	err = stmt.QueryRowContext(ctx, id).Scan(&role)
	if err != nil {
		return "", err
	}

	return role, nil
}
