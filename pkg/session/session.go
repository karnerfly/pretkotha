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

type SessionInterface interface {
	Serialize(ctx context.Context, key string, value any, ttl int64) error
	DeSerialize(ctx context.Context, key string, value any) error
	Update(ctx context.Context, key string, value any) error
	Remove(ctx context.Context, key string) error
}

type Session struct {
	client *redis.Client
}

func GetIdleTimeoutContext(base context.Context) (context.Context, context.CancelFunc) {
	return context.WithTimeout(base, 2*time.Second)
}

func New(url string) (*Session, error) {
	opts, err := redis.ParseURL(url)
	if err != nil {
		return nil, err
	}

	s := &Session{
		client: redis.NewClient(opts),
	}

	ctx, cancle := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancle()
	if s.client.Ping(ctx).Err() != nil {
		return nil, ErrNotInitialize
	}

	return s, nil
}

// serialize the key, value in session for ttl time (second)
func (s *Session) Serialize(ctx context.Context, key string, value any, ttl int64) error {
	if s == nil {
		return ErrNotInitialize
	}

	data, err := utils.ToJSON(value)
	if err != nil {
		return err
	}

	return s.client.SetEx(ctx, key, string(data), time.Duration(ttl)*time.Second).Err()
}

func (s *Session) DeSerialize(ctx context.Context, key string, value any) error {
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

func (s *Session) Update(ctx context.Context, key string, value any) error {
	if s == nil {
		return ErrNotInitialize
	}

	data, err := utils.ToJSON(value)
	if err != nil {
		return err
	}

	return s.client.Set(ctx, key, data, redis.KeepTTL).Err()
}

func (s *Session) Remove(ctx context.Context, key string) error {
	if s == nil {
		return ErrNotInitialize
	}
	sc := s.client.Del(ctx, key)

	return sc.Err()
}
