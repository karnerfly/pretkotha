package models

import (
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID            uuid.UUID `json:"id"`
	User          User      `json:"user"`
	UserId        uuid.UUID `json:"user_id"`
	AccountType   string    `json:"account_type"`
	Activated     bool      `json:"activated"`
	LastLogin     time.Time `json:"last_login"`
	SessionExpiry time.Time `json:"session_expiry"`
	RefreshToken  string
}
