package types

import (
	"log"
	"time"
)

type Config struct {
	Domain             string
	Version            string
	JwtSecret          string
	JwtExpiry          time.Duration
	ServerAddress      string
	ServerReadTimeout  time.Duration
	ServerWriteTimeout time.Duration
	ServerIdleTimeout  time.Duration
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
