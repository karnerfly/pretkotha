package session

import (
	"context"
	"errors"
	"time"

	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/redis/go-redis/v9"
)

type SessionError error

var (
	ErrNotInitialize = errors.New("session is not initialize")
)

const Nil = redis.Nil

type Session struct {
	client *redis.Client
}

var s *Session

func GetIdleTimeoutContext() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 5*time.Second)
}

func Init(url string) error {
	opts, err := redis.ParseURL(url)
	if err != nil {
		return err
	}

	s = &Session{
		client: redis.NewClient(opts),
	}

	ctx, cancle := GetIdleTimeoutContext()
	defer cancle()
	sc := s.client.Ping(ctx)
	if sc.Err() != nil {
		return errors.New("Session cannot initialized")
	}

	return nil
}

func Serialize(ctx context.Context, key string, value any, ttl time.Duration) error {
	if s == nil {
		return ErrNotInitialize
	}

	data, err := utils.ToJSON(value)
	if err != nil {
		return err
	}

	sc := s.client.SetEx(ctx, key, string(data), ttl)

	return sc.Err()
}

func DeSerialize(ctx context.Context, key string, value any) error {
	if s == nil {
		return ErrNotInitialize
	}
	sc := s.client.Get(ctx, key)

	data, err := sc.Result()
	if err != nil {
		return err
	}

	return utils.FromJSON([]byte(data), value)
}

func Remove(ctx context.Context, key string) error {
	if s == nil {
		return ErrNotInitialize
	}
	sc := s.client.Del(ctx, key)

	return sc.Err()
}
