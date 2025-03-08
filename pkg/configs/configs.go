package configs

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Domain         string
	Version        string
	JwtSecret      string
	ServerAddress  string
	DatabaseURL    string
	SmtpUsername   string
	SmtpPassword   string
	SmtpHost       string
	SmtpServerAddr string
	From           string
	RedisUrl       string

	JwtExpiry           int64
	ServerReadTimeout   int64
	ServerWriteTimeout  int64
	ServerIdleTimeout   int64
	AuthCookieExpiry    int64
	SessionCookieExpiry int64
}

func Load() error {
	if err := godotenv.Load(".env"); err != nil {
		return err
	}
	return nil
}

func New() *Config {
	return &Config{
		ServerAddress:  getEnvString("SERVER_ADDRERSS", ":3000"),
		Version:        getEnvString("VERSION", "v0.1-alpha"),
		Domain:         getEnvString("DOMAIN", "localhost"),
		JwtSecret:      getEnvString("JWT_SECRET", "random_jwt_secret"),
		DatabaseURL:    getEnvString("DATABASE_URL", ""),
		SmtpUsername:   getEnvString("SMTP_USERNAME", ""),
		SmtpPassword:   getEnvString("SMTP_PASSWORD", ""),
		SmtpHost:       getEnvString("SMTP_HOST", ""),
		SmtpServerAddr: getEnvString("SMTP_SERVER_ADDRESS", ""),
		From:           getEnvString("SMTP_FROM", ""),
		RedisUrl:       getEnvString("REDIS_URL", ""),

		// time in second
		JwtExpiry:           getEnvInt64("JWT_EXPIRY", 604800),             // 7 days
		ServerReadTimeout:   getEnvInt64("SERVER_READ_TIMEOUT", 20),        // 20 seconds
		ServerWriteTimeout:  getEnvInt64("SERVER_WRITE_TIMEOUT", 15),       // 15 seconds
		ServerIdleTimeout:   getEnvInt64("SERVER_IDLE_TIMEOUT", 90),        // 1 minute 30 seconds
		AuthCookieExpiry:    getEnvInt64("AUTH_COOKIE_EXPIRY", 604800),     // 7 days
		SessionCookieExpiry: getEnvInt64("SESSION_COOKIE_EXPIRY", 2592000), // 30 days
	}
}

func getEnvString(name, defaultValue string) string {
	if value, exists := os.LookupEnv(name); exists {
		return value
	}
	return defaultValue
}

func getEnvInt64(name string, defaultValue int64) int64 {
	if value, exists := os.LookupEnv(name); exists {
		n, err := strconv.Atoi(value)
		if err == nil {
			return int64(n)
		}
	}
	return defaultValue
}
