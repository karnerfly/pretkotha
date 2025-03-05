package models

type Like struct {
	LikedOn   Post   `json:"liked_on"`
	LikedBy   User   `json:"liked_by"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
