package configs

import (
	"os"
	"time"

	"github.com/Pureparadise56b/pretkotha/types"
	"github.com/joho/godotenv"
)

func New() *types.Config {
	if err := godotenv.Load(".env"); err != nil {
		return nil
	}
	return &types.Config{
		ServerAddress: getEnv("SERVER_ADDRERSS", ":3000").(string),
		Version:       getEnv("VERSION", "v0.1-alpha").(string),
		Domain:        getEnv("DOMAIN", "pretkotha.com").(string),
		JwtSecret:     getEnv("JWT_SECRET", "").(string),
		JwtExpiry:     getEnv("JWT_EXPIRY", int64(30*24*time.Hour)).(int64),
	}
}

func getEnv(name string, defaultValue any) any {
	if value, exists := os.LookupEnv(name); exists {
		return value
	}

	return defaultValue
}
