package types

import "log"

type Config struct {
	Domain        string
	Version       string
	JwtSecret     string
	JwtExpiry     int64
	ServerAddress string
}

type Logger struct {
	ErrLogger  *log.Logger
	InfoLogger *log.Logger
}

type Role string

const (
	AdminRole Role = "ADMIN"
	UserRole  Role = "USER"
)

type MailTypes []string
