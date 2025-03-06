package services

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/karnerfly/pretkotha/pkg/models"
)

func TestRegister(t *testing.T) {
	mr := &mockUserRepo{}
	us := NewUserService(mr)

	req := &models.CreateUserPayload{
		UserName:  "toufique",
		Email:     "toufique23@gmail.com",
		Hash:      "hash1",
		AvatarUrl: "avatar.jpg",
		Bio:       "interesting bio",
		Phone:     "9339813538",
	}

	err := us.Register(req)
	if err != nil {
		t.Error(err)
		t.Fail()
	}
}

type mockUserRepo struct {
}

func (m *mockUserRepo) CreateUser(ctx context.Context, user *models.CreateUserPayload) (string, error) {
	return "e898194f-c64b-46d4-a263-9fc0c2e65637", nil
}
func (m *mockUserRepo) GetUserById(ctx context.Context, id string) (*models.User, error) {
	if id != "e898194f-c64b-46d4-a263-9fc0c2e65637" {
		return nil, fmt.Errorf("user not found")
	}

	user := &models.User{
		ID:       "e898194f-c64b-46d4-a263-9fc0c2e65637",
		UserName: "toufique",
		Email:    "toufique@gmail.com",
		Hash:     "hash1",
		IsBanned: false,
		BannedAt: "",
		Profile: models.UserProfile{
			AvatarUrl: "avatar.jpg",
			Bio:       "interesting bio",
			Phone:     "9339813538",
			Role:      "user",
		},
		CreatedAt: time.Now().Format(time.DateTime),
		UpdatedAt: time.Now().Format(time.DateTime),
	}
	return user, nil
}
func (m *mockUserRepo) ExistsByEmail(ctx context.Context, email string) (bool, error) {
	if email == "toufique@gmail.com" {
		return true, nil
	}
	return false, nil
}
