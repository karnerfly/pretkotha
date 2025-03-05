package db

import (
	"database/sql"
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

	return &DB{
		client: db,
	}, nil
}

func (db *DB) Client() *sql.DB {
	return db.client
}
