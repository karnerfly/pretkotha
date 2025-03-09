package store

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
)

type LocalStorage struct {
	maxSize  int64
	basePath string
}

func NewLocalStorage(b string, m int64) *LocalStorage {
	return &LocalStorage{
		basePath: b,
		maxSize:  m,
	}
}

func (ls *LocalStorage) Save(path string, body io.Reader) error {
	fp, err := ls.getFullPath(path)
	if err != nil {
		return fmt.Errorf("failed to get full path: %w", err)
	}

	dir := filepath.Dir(fp)
	if err = os.MkdirAll(dir, os.ModePerm); err != nil {
		return fmt.Errorf("failed to create directory %s: %w", dir, err)
	}

	file, err := os.Create(fp)
	if err != nil {
		return fmt.Errorf("failed to create file %s: %w", fp, err)
	}
	defer file.Close()

	n, err := io.Copy(file, body)
	if err != nil {
		return fmt.Errorf("failed to write to file %s: %w", fp, err)
	}

	if n > ls.maxSize {
		os.Remove(fp)
		return fmt.Errorf("file %s is too large (%d bytes)", fp, n)
	}

	return nil
}

func (ls *LocalStorage) Remove(path string) error {
	fp, err := ls.getFullPath(path)
	if err != nil {
		return err
	}
	return os.Remove(fp)
}

func (ls *LocalStorage) getFullPath(path string) (string, error) {
	fullBasePath, err := filepath.Abs(ls.basePath)
	if err != nil {
		return "", err
	}
	fullPath := filepath.Join(fullBasePath, path)

	return fullPath, nil
}
