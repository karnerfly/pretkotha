package models

type UserProfile struct {
	AvatarUrl string `json:"avatar_url"`
	Bio       string `json:"bio"`
	Phone     string `json:"phone"`
	Role      string `json:"-"`
	CreatedAt string `json:"-"`
	UpdatedAt string `json:"-"`
}
