package models

type Post struct {
	ID          string     `json:"id"`
	Slug        string     `json:"slug"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Thumbnail   string     `json:"thumbnail"`
	Content     string     `json:"content"`
	Kind        string     `json:"kind"`
	Category    string     `json:"category"`
	IsDeleted   bool       `json:"is_deleted"`
	PostBy      *StoryUser `json:"post_by"`
	Likes       int64      `json:"likes"`
	CreatedAt   string     `json:"created_at"`
	UpdatedAt   string     `json:"updated_at"`
}

func NewPost() *Post {
	return &Post{}
}
