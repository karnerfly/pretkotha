package models

type CreateUserRequest struct {
	UserName  string `json:"user_name" validate:"required,min=5,max=20"`
	Email     string `json:"email" validate:"required,email"`
	Hash      string `json:"password" validate:"required"`
	AvatarUrl string `json:"avatar_url"`
	Bio       string `json:"bio"`
	Phone     string `json:"phone"`
}

type LoginUserRequest struct {
	Email string `json:"email" validate:"required,email"`
	Hash  string `json:"password" validate:"required"`
}

type CreatePostRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Thumbnail   string `json:"thumbnail"`
	Content     string `json:"content"`
	Kind        string `json:"kind"`
	Category    string `json:"category"`
}

type LikeRequest struct {
	UserId string `json:"user_id"`
}

type DislikeRequest struct {
	UserId string `json:"user_id"`
}
