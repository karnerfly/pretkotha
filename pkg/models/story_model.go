package models

import "github.com/google/uuid"

type Story struct {
	ID       uuid.UUID `json:"id"`
	Title    string    `json:"title"`
	Category string    `json:"category"`
	Content  string    `json:"content"`
	Author   User      `json:"author"`
	AuthorId uuid.UUID `json:"author_id"`
	Likes    int64     `json:"likes"`
}
