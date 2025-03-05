package configs

import (
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
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
	DatabaseURL        string
}

func Load() error {
	if err := godotenv.Load(".env"); err != nil {
		return err
	}
	return nil
}

func New() *Config {
	return &Config{
		ServerAddress:      getEnv("SERVER_ADDRERSS", ":3000").(string),
		Version:            getEnv("VERSION", "v0.1-alpha").(string),
		Domain:             getEnv("DOMAIN", "pretkotha.com").(string),
		JwtSecret:          getEnv("JWT_SECRET", "random_jwt_secret").(string),
		JwtExpiry:          getEnv("JWT_EXPIRY", time.Duration(30*24*time.Hour)).(time.Duration),
		ServerReadTimeout:  getEnv("SERVER_READ_TIMEOUT", time.Duration(20)).(time.Duration),
		ServerWriteTimeout: getEnv("SERVER_WRITE_TIMEOUT", time.Duration(15)).(time.Duration),
		ServerIdleTimeout:  getEnv("SERVER_IDLE_TIMEOUT", time.Duration(90)).(time.Duration),
		DatabaseURL:        getEnv("DATABASE_URL", "").(string),
	}
}

func getEnv(name string, defaultValue any) any {
	if value, exists := os.LookupEnv(name); exists {
		switch defaultValue.(type) {
		case string:
			return value
		case time.Duration:
			v, err := strconv.Atoi(value)
			if err != nil {
				return defaultValue
			}
			return time.Duration(v)
		}
	}

	return defaultValue
}
