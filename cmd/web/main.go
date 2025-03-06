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

	// establish connection with database. (if err then exit)
	db, err := db.New(cfg.DatabaseURL)
	if err != nil {
		logger.Fatal(err)
	}

	if err = session.Init(cfg.RedisUrl); err != nil {
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

	// initialize mail queue for OTP mail channel and EVENT mail channel
	mailqueue.Init(10)

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
	router.Initialize(r, db.Client())

	// create server
	server := &http.Server{
		Addr:         cfg.ServerAddress,
		Handler:      r,
		ReadTimeout:  cfg.ServerReadTimeout * time.Second,
		WriteTimeout: cfg.ServerWriteTimeout * time.Second,
		IdleTimeout:  cfg.ServerIdleTimeout * time.Second,
	}

	// listen in another go routine
	go func() {
		logger.INFO("Server Listing at " + cfg.ServerAddress)
		if err := server.ListenAndServe(); err != nil {
			logger.Fatal(err)
		}
	}()

	// handle graceful shutdown
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt)
	signal.Notify(sig, syscall.SIGTERM)

	s := <-sig
	// close database
	if err := db.Close(); err != nil {
		logger.ERROR(err.Error())
	}

	// stop queue workers
	mailqueue.Shutdown()

	ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancle()

	// shutdown the server
	logger.INFO(fmt.Sprintf("shutting down the server:[SIGNAL=%s]", s))
	if err := server.Shutdown(ctx); err != nil {
		logger.ERROR(err.Error())
	}
}
