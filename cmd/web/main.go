package main

import (
	"net/http"

	"github.com/Pureparadise56b/pretkotha/pkg/configs"
	"github.com/Pureparadise56b/pretkotha/pkg/logger"
	"github.com/Pureparadise56b/pretkotha/pkg/router"
	"github.com/gin-gonic/gin"
)

func main() {
	logger.Init()

	cfg := configs.New()
	r := gin.Default()

	router.Initialize(r)

	logger.Fatal(http.ListenAndServe(cfg.ServerAddress, r))
}
