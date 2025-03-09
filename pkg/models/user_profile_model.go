package models

import "github.com/karnerfly/pretkotha/pkg/enum"

type UserProfile struct {
	AvatarUrl string    `json:"avatar_url"`
	Bio       string    `json:"bio"`
	Phone     string    `json:"phone"`
	Role      enum.Role `json:"role"`
	CreatedAt string    `json:"-"`
	UpdatedAt string    `json:"-"`
}
