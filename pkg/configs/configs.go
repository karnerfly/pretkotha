package configs

import (
	"os"

	"github.com/Pureparadise56b/pretkotha/types"
	"github.com/joho/godotenv"
)

func New() *types.Config {
	if err := godotenv.Load(".env"); err != nil {
		return nil
	}
	return &types.Config{
		JwtSecret:     getEnv("JWT_SECRET", ""),
		ServerAddress: getEnv("SERVER_ADDRERSS", ":3000"),
		Version:       getEnv("VERSION", "v0.1-alpha"),
		Domain:        getEnv("DOMAIN", "pretkotha.com"),
	}
}

func getEnv(name string, defaultValue string) string {
	if value, exists := os.LookupEnv(name); exists {
		return value
	}

	return defaultValue
}
