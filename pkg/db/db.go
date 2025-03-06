package db

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/karnerfly/pretkotha/pkg/logger"
)

type DatabaseError error

var (
	ErrDatabaseOpen        DatabaseError = errors.New("cannot open database connection")
	ErrDatabasePing        DatabaseError = errors.New("cannot establish connection with database")
	ErrRecordNotFound      DatabaseError = errors.New("records not found")
	ErrRecordAlreadyExists DatabaseError = errors.New("record already exists")
)

type DB struct {
	client *sql.DB
}

func New(url string) (*DB, error) {
	db, err := sql.Open("postgres", url)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		db.Close()
		return nil, err
	}

	logger.INFO("Database Connection Established Successfully")
	return &DB{
		client: db,
	}, nil
}

func (db *DB) Client() *sql.DB {
	return db.client
}

func (db *DB) Close() error {
	return db.client.Close()
}

func GetIdleTimeoutContext() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 5*time.Second)
}
