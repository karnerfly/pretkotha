package models

import "github.com/google/uuid"

type Like struct {
	ID      uuid.UUID
	LikerId uuid.UUID
	StoryId uuid.UUID
}
