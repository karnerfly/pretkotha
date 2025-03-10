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
	"github.com/karnerfly/pretkotha/pkg/queue/mailqueue"
	"github.com/karnerfly/pretkotha/pkg/router"
	"github.com/karnerfly/pretkotha/pkg/services/mail"
	"github.com/karnerfly/pretkotha/pkg/session"
	_ "github.com/lib/pq"
)

func main() {
	// load required configurations for server
	if err := configs.Load(); err != nil {
		logger.Fatal(err)
	}
	cfg := configs.New()

	// initialize session
	redisSession, err := session.New(cfg.RedisUrl)
	if err != nil {
		logger.Fatal(err)
	}

	// establish connection with database. (if err then exit)
	db, err := db.New(cfg.DatabaseURL)
	if err != nil {
		logger.Fatal(err)
	}

	// create mailservice and parse all mail templates
	mailService := mail.NewMailService(mail.Option{
		SmtpUsername:   cfg.SmtpUsername,
		SmtpPassword:   cfg.SmtpPassword,
		SmtpHost:       cfg.SmtpHost,
		SmtpServerAddr: cfg.SmtpServerAddr,
		From:           cfg.From,
	})

	if err = mailService.ParseTemplate(); err != nil {
		logger.ERROR(err.Error())
	}

	// register worker for send OTP mail
	err = mailqueue.RegisterWorker(mailqueue.TypeOtp, func(payload *mailqueue.MailPayload) error {
		ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancle()

		otp := payload.Data.(string)
		err := mailService.SendOtpMail(ctx, payload.To, otp)
		if err != nil {
			return err
		}
		logger.INFO("Mail sent successfully")
		return nil
	})
	if err != nil {
		logger.ERROR(err.Error())
	}

	// create ServeMux with gin
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	router.Initialize(r, db.Client(), redisSession)

	// create static server to to serve static files
	staticServer := NewStaticServer()

	// create server
	server := &http.Server{
		Addr:         cfg.ServerAddress,
		Handler:      r,
		ReadTimeout:  time.Duration(cfg.ServerReadTimeout) * time.Second,
		WriteTimeout: time.Duration(cfg.ServerWriteTimeout) * time.Second,
		IdleTimeout:  time.Duration(cfg.ServerIdleTimeout) * time.Second,
	}

	// listen static server in port 3001
	go func() {
		if err := staticServer.Start(); err != nil {
			logger.ERROR(err.Error())
		}
	}()

	// listen api server in port 3000
	go func() {
		logger.INFO("Api Server Listing on " + cfg.ServerAddress)
		if err := server.ListenAndServe(); err != nil {
			logger.Fatal(err)
		}
	}()

	// handle graceful shutdown
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt)
	signal.Notify(sig, syscall.SIGTERM)

	s := <-sig
	// close session
	if err := redisSession.Shutdown(); err != nil {
		logger.ERROR(err.Error())
	}

	// close database
	if err := db.Close(); err != nil {
		logger.ERROR(err.Error())
	}

	// stop queue workers
	mailqueue.Shutdown()

	ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancle()

	// shutdown the static server
	if err := staticServer.Shutdown(); err != nil {
		logger.ERROR(err.Error())
	}

	// shutdown the server
	logger.INFO(fmt.Sprintf("shutting down the server:[SIGNAL=%s]", s))
	if err := server.Shutdown(ctx); err != nil {
		logger.ERROR(err.Error())
	}
}
