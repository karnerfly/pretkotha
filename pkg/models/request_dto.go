package models

import "github.com/karnerfly/pretkotha/pkg/enum"

type SendOtpPayload struct {
	Email string `json:"email" validate:"required,email"`
}

type VerifyOtpPayload struct {
	Email string `json:"email" validate:"required,email"`
	Otp   string `json:"otp" validate:"required,numeric,len=6"`
}

type CreateUserPayload struct {
	UserName string `json:"user_name" validate:"required,min=4,max=20"`
	Email    string `json:"email" validate:"required,email"`
	Hash     string `json:"password" validate:"required,min=8,max=25"`
	Bio      string `json:"bio" validate:"omitempty,max=60"`
	Phone    string `json:"phone" validate:"omitempty,phone"`
}

type LoginUserPayload struct {
	Email string `json:"email" validate:"required,email"`
	Hash  string `json:"password" validate:"required"`
}

type UpdateUserPayload struct {
	UserName string `json:"user_name" validate:"required,min=4,max=20"`
	Bio      string `json:"bio" validate:"omitempty,max=60"`
	Phone    string `json:"phone" validate:"omitempty,phone"`
}

type CreatePostPayload struct {
	Title       string `json:"title" validate:"required,min=10,max=30"`
	Description string `json:"description" validate:"omitempty,max=60"`
	Content     string `json:"content" validate:"required"`
	Kind        string `json:"kind" validate:"required"`
	Category    string `json:"category" validate:"required"`
}

type LikePayload struct {
	UserId string `json:"user_id"`
}

type DislikPayload struct {
	UserId string `json:"user_id"`
}

type GetPostsParam struct {
	Page     int
	Limit    int
	SortBy   enum.Sort
	FilterBy enum.Filter
}
