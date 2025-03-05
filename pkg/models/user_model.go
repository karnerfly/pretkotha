package models

type User struct {
	ID        string      `json:"id"`
	UserName  string      `json:"user_name"`
	Email     string      `json:"email"`
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
