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
	Bio      string `json:"bio"`
	Phone    string `json:"phone"`
}

type LoginUserPayload struct {
	Email string `json:"email" validate:"required,email"`
	Hash  string `json:"password" validate:"required"`
}

type CreatePostPayload struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Thumbnail   string `json:"thumbnail"`
	Content     string `json:"content"`
	Kind        string `json:"kind"`
	Category    string `json:"category"`
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
