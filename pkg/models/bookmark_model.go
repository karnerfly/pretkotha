package models

type Bookmark struct {
	Post      Post   `json:"post"`
	User      User   `json:"user"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
