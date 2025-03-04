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
	"github.com/karnerfly/pretkotha/pkg/logger"
	"github.com/karnerfly/pretkotha/pkg/router"
)

func main() {
	logger.Init()

	cfg := configs.New()
	r := gin.Default()

	router.Initialize(r)

	server := &http.Server{
		Addr:         cfg.ServerAddress,
		Handler:      r,
		ReadTimeout:  cfg.ServerReadTimeout * time.Second,
		WriteTimeout: cfg.ServerWriteTimeout * time.Second,
		IdleTimeout:  cfg.ServerIdleTimeout * time.Second,
	}

	go func() {
		err := server.ListenAndServe()
		if err != nil {
			logger.Fatal(err)
		}
	}()

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
