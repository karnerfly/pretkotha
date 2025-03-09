package services

import (
	"context"
	"testing"

	"github.com/karnerfly/pretkotha/pkg/models"
)

func TestRegister(t *testing.T) {
	mr := &mockUserRepo{}
	ms := &mockUserSession{}
	as := NewAuthService(mr, ms)

	req := &models.CreateUserPayload{
		UserName: "toufique",
		Email:    "toufique23@gmail.com",
		Hash:     "hash1",
		Bio:      "interesting bio",
		Phone:    "9339813538",
	}

	err := as.Register(context.TODO(), req)
	if err != nil {
		t.Error(err)
		t.Fail()
	}
}

func TestSendOtp(t *testing.T) {
	mr := &mockUserRepo{}
	ms := &mockUserSession{}
	as := NewAuthService(mr, ms)

	payload := &models.SendOtpPayload{
		Email: "toufique26ajay@gmail.com",
	}
	err := as.SendOtp(context.TODO(), payload)
	if err != nil {
		t.Fatal(err)
	}
}

func TestVerifyOtp(t *testing.T) {
	mr := &mockUserRepo{}
	ms := &mockUserSession{}
	as := NewAuthService(mr, ms)

	payload := &models.VerifyOtpPayload{
		Email: "toufique26ajay@gmail.com",
		Otp:   "1234",
	}
	err := as.VerifyOtp(context.TODO(), payload)
	if err != nil {
		t.Fatal(err)
	}
}

func TestLogin(t *testing.T) {
	mr := &mockUserRepo{}
	ms := &mockUserSession{}
	as := NewAuthService(mr, ms)

	payload := &models.LoginUserPayload{
		Email: "toufique26ajay@gmail.com",
		Hash:  "123456",
	}
	token, sid, err := as.Login(context.TODO(), payload)
	if err != nil {
		t.Fatal(err)
	}

	t.Log(token, sid)
}

func TestLogout(t *testing.T) {
	mr := &mockUserRepo{}
	ms := &mockUserSession{}
	as := NewAuthService(mr, ms)

	err := as.Logout(context.TODO(), "hello")
	if err != nil {
		t.Fatal(err)
	}
}

type mockUserSession struct{}

func (s *mockUserSession) Serialize(ctx context.Context, key string, value any, ttl int64) error {
	return nil
}
func (s *mockUserSession) DeSerialize(ctx context.Context, key string, value any) error {
	return nil
}
func (s *mockUserSession) Remove(ctx context.Context, key string) error {
	return nil
}
func (s *mockUserSession) Update(ctx context.Context, key string, value any) error {
	return nil
}

func (s *mockUserSession) Shutdown() error {
	return nil
}
