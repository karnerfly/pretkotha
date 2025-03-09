package store

import "io"

type Storage interface {
	Save(path string, body io.Reader) error
	Remove(path string) error
}
