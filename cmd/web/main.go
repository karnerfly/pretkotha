package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/logger"
	"github.com/karnerfly/pretkotha/pkg/router"
	_ "github.com/lib/pq"
)

func main() {
	// // create custom logger for dubegging
	// logger.Init()

	// load required configurations for server
	if err := configs.Load(); err != nil {
		logger.Fatal(err)
	}
	cfg := configs.New()

	// establish connection with database. (if err then exit)
	db, err := db.New(cfg.DatabaseURL)
	if err != nil {
		logger.Fatal(err)
	}

	// create ServeMux with gin
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	router.Initialize(r, db.Client())

	// create server
	server := &http.Server{
		Addr:         cfg.ServerAddress,
		Handler:      r,
		ReadTimeout:  cfg.ServerReadTimeout * time.Second,
		WriteTimeout: cfg.ServerWriteTimeout * time.Second,
		IdleTimeout:  cfg.ServerIdleTimeout * time.Second,
	}

	go func() {
		logger.INFO("Server Listing at " + cfg.ServerAddress)
		err := server.ListenAndServe()
		if err != nil {
			logger.Fatal(err)
		}
	}()

	// handle graceful shutdown
	HandleServerShutdown(server)
}

func HandleServerShutdown(server *http.Server) {
	sig := make(chan os.Signal, 1)

	signal.Notify(sig, os.Interrupt)
	signal.Notify(sig, syscall.SIGTERM)

	s := <-sig
	logger.INFO(fmt.Sprintf("shutting down the server:[SIGNAL=%s]", s))
	ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancle()
	err := server.Shutdown(ctx)
	if err != nil {
		logger.ERROR(err.Error())
	}
}
