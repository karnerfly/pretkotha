package session

import "github.com/redis/go-redis/v9"

type Session struct {
	client *redis.Client
}

func NewSession() *Session {
	return &Session{
		client: nil,
	}
}
