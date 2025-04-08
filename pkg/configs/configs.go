package configs

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	ServerAddress       string
	Domain              string
	Version             string
	AvatarFilesBaseDir  string
	JwtSecret           string
	DatabaseURL         string
	SmtpUsername        string
	SmtpPassword        string
	SmtpHost            string
	SmtpServerAddr      string
	From                string
	StaticServerBaseUrl string
	RedisUrl            string
	CorsAllowOrigin     string

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

func New() Config {
	return Config{
		ServerAddress:       getEnvString("SERVER_ADDRERSS", ":3000"),
		Version:             getEnvString("VERSION", "v0.1-alpha"),
		AvatarFilesBaseDir:  getEnvString("AVATAR_FILES_BASE_PATH", "./static/images"),
		Domain:              getEnvString("DOMAIN", ""),
		JwtSecret:           getEnvString("JWT_SECRET", ""),
		DatabaseURL:         getEnvString("DATABASE_URL", ""),
		SmtpUsername:        getEnvString("SMTP_USERNAME", ""),
		SmtpPassword:        getEnvString("SMTP_PASSWORD", ""),
		SmtpHost:            getEnvString("SMTP_HOST", ""),
		SmtpServerAddr:      getEnvString("SMTP_SERVER_ADDRESS", ""),
		From:                getEnvString("SMTP_FROM", ""),
		StaticServerBaseUrl: getEnvString("STATIC_SERVER_BASE_URL", ""),
		RedisUrl:            getEnvString("REDIS_URL", ""),
		CorsAllowOrigin:     getEnvString("CORS_ALLOW_ORGIN", "*"),

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
