package models

type User struct {
	ID        string      `json:"id"`
	UserName  string      `json:"user_name" validate:"required,min=5,max=20"`
	Email     string      `json:"email" validate:"required,email"`
	Hash      string      `json:"-"`
	IsBanned  bool        `json:"is_banned"`
	BannedAt  string      `json:"banned_at"`
	Profile   UserProfile `json:"profile"`
	CreatedAt string      `json:"created_at"`
	UpdatedAt string      `json:"updated_at"`
}

func NewUser() *User {
	return &User{}
}
