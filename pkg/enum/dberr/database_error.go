package dberr

import "errors"

type DatabaseError error

var (
	ErrDatabaseOpen        DatabaseError = errors.New("cannot open database connection")
	ErrDatabasePing        DatabaseError = errors.New("cannot establish connection with database")
	ErrRecordNotFound      DatabaseError = errors.New("records not found")
	ErrRecordAlreadyExists DatabaseError = errors.New("record already exists")
)
