package session

import (
	"context"
	"errors"
	"time"

	"github.com/redis/go-redis/v9"
)

type SessionError error

var (
	ErrNotInitialize = errors.New("session is not initialize")
)

type Session struct {
	client *redis.Client
}

var session *Session

func Init(url string) error {
	opts, err := redis.ParseURL(url)
	if err != nil {
		return err
	}

	session = &Session{
		client: redis.NewClient(opts),
	}

	ctx, cancle := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancle()
	sc := session.client.Ping(ctx)

	return sc.Err()
}

func (s *Session) Serialize(ctx context.Context, key string, value any, ttl time.Duration) error {
	if session == nil {
		return ErrNotInitialize
	}
	sc := session.client.SetEx(ctx, key, value, ttl)

	return sc.Err()
}

func (s *Session) DeSerialize(ctx context.Context, key string) (string, error) {
	if session == nil {
		return "", ErrNotInitialize
	}
	sc := session.client.Get(ctx, key)

	return sc.Result()
}

func (s *Session) Remove(ctx context.Context, key string) error {
	if session == nil {
		return ErrNotInitialize
	}
	sc := session.client.Del(ctx, key)

	return sc.Err()
}
