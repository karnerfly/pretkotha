package models

import "github.com/google/uuid"

type User struct {
	ID       uuid.UUID `json:"id"`
	Name     string    `json:"name" validate:"required,min=5,max=20"`
	Email    string    `json:"email" validate:"required,email"`
	Password string    `json:"password" validate:"required,min=8,max=20"`
	Avatar   string    `json:"avatar"`
	Stories  []Story   `json:"stories"`
	Likes    []Like    `json:"likes"`
}
