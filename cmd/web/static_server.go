package main

import (
	"context"
	"net/http"
	"time"

	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/logger"
)

type StaticServerConfig struct {
	Addr               string
	BaseDir            string
	ServerReadTimeout  int64
	ServerWriteTimeout int64
	ServerIdleTimeout  int64
}

type StaticServer struct {
	http.Server
}

func NewStaticServer() *StaticServer {
	cfg := configs.New()

	staticCfg := StaticServerConfig{
		Addr:               ":3001",
		BaseDir:            "./static",
		ServerReadTimeout:  cfg.ServerReadTimeout,
		ServerWriteTimeout: cfg.ServerWriteTimeout,
		ServerIdleTimeout:  cfg.ServerIdleTimeout,
	}

	fileServer := http.FileServer(http.Dir(staticCfg.BaseDir))
	mux := http.NewServeMux()
	mux.Handle("/static/", http.StripPrefix("/static", fileServer))

	mux.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	return &StaticServer{
		Server: http.Server{
			Addr:         staticCfg.Addr,
			Handler:      mux,
			IdleTimeout:  time.Duration(staticCfg.ServerIdleTimeout) * time.Second,
			ReadTimeout:  time.Duration(staticCfg.ServerReadTimeout) * time.Second,
			WriteTimeout: time.Duration(staticCfg.ServerWriteTimeout) * time.Second,
		},
	}
}

func (ss *StaticServer) Start() error {
	logger.INFO("Staic Server listening on [:3001]")
	return ss.Server.ListenAndServe()
}

func (ss *StaticServer) Shutdown() error {
	logger.INFO("shutting down static server")
	ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancle()
	return ss.Server.Shutdown(ctx)
}
