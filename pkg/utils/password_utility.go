package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) string {
	h, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		return ""
	}

	return string(h)
}

func ComparePassword(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
