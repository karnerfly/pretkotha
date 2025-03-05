package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/enum"
)

func GenerateRandomUUID() string {
	id := uuid.New()
	return id.String()
}

func GenerateJwtToken(sub string) string {
	cfg := configs.New()
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": sub,
		"iss": cfg.Domain,
		"aud": enum.UserRole,
		"iat": time.Now().Unix(),
		"exp": cfg.JwtExpiry,
	})

	tokenString, err := claims.SignedString([]byte(cfg.JwtSecret))

	if err != nil {
		return ""
	}
	return tokenString
}

func VerifyJwtToken(tokenString string) *jwt.Token {
	cfg := configs.New()
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(cfg.JwtSecret), nil
	})

	if err != nil {
		return nil
	}

	if !token.Valid {
		return nil
	}

	return token
}
