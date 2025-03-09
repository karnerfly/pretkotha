package services

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/karnerfly/pretkotha/pkg/models"
)

func TestGetUser(t *testing.T) {
	mr := &mockUserRepo{}
	us := NewUserService(mr, nil)

	user, err := us.GetUser(context.TODO(), "e898194f-c64b-46d4-a263-9fc0c2e65637")
	if err != nil {
		t.Fatal(err)
	}

	t.Log(user)
}

type mockUserRepo struct{}

func (m *mockUserRepo) CreateUser(ctx context.Context, user *models.CreateUserPayload) (string, error) {
	return "e898194f-c64b-46d4-a263-9fc0c2e65637", nil
}

func (m *mockUserRepo) ActivateUser(ctx context.Context, email string) error {
	return nil
}

func (m *mockUserRepo) IsActiveUser(ctx context.Context, email string) (bool, error) {
	return false, nil
}

func (m *mockUserRepo) SearchUserByEmailPassword(ctx context.Context, email, password string) (string, error) {
	return "e898194f-c64b-46d4-a263-9fc0c2e65637", nil
}

func (m *mockUserRepo) GetUserById(ctx context.Context, id string) (*models.User, error) {
	if id != "e898194f-c64b-46d4-a263-9fc0c2e65637" {
		return nil, fmt.Errorf("user not found")
	}

	user := &models.User{
		ID:       "e898194f-c64b-46d4-a263-9fc0c2e65637",
		UserName: "toufique",
		Email:    "toufique26ajay@gmail.com",
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
	if email == "toufique26ajay@gmail.com" {
		return true, nil
	}
	return false, nil
}

func (m *mockUserRepo) UpdateUserAvatar(ctx context.Context, id, url string) error {
	return nil
}

func (m *mockUserRepo) DeleteUserAvatar(ctx context.Context, id string) (string, error) {
	return "", nil
}

func (m *mockUserRepo) UpdateUserProfile(ctx context.Context, id string, req *models.UpdateUserPayload) error {
	return nil
}
