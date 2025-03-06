package utils

import (
	"encoding/hex"

	"golang.org/x/crypto/argon2"
)

func HashPassword(password string) string {
	hash := argon2.IDKey([]byte(password), nil, 1, 64*1024, 4, 32)
	return hex.EncodeToString(hash)
}

func ComparePassword(password, hash string) bool {
	return HashPassword(password) == hash
}
