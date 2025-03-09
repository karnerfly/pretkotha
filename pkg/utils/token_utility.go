package utils

import (
	"crypto/rand"
	"encoding/base64"
	mrand "math/rand"
	"strconv"
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

func GenerateUrlEncodedToken(size int) (string, error) {
	b := make([]byte, size)

	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	d := base64.StdEncoding.EncodeToString(b)
	return d, nil
}

func ConvertToBase64(src string) string {
	return base64.StdEncoding.EncodeToString([]byte(src))
}

func GenerateRandomNumber() string {
	n := mrand.Intn(900000) + 100000
	return strconv.Itoa(n)
}

func GenerateJwtToken(sub string) string {
	cfg := configs.New()
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": sub,
		"iss": cfg.Domain,
		"aud": enum.UserRole,
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(time.Duration(cfg.JwtExpiry) * time.Second).Unix(),
	})

	tokenString, err := claims.SignedString([]byte(cfg.JwtSecret))

	if err != nil {
		return ""
	}
	return tokenString
}

func VerifyJwtToken(tokenString string) (*jwt.Token, error) {
	cfg := configs.New()
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(cfg.JwtSecret), nil
	})

	if err != nil {
		return token, err
	}

	return token, nil
}
