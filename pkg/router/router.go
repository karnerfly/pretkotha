package router

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/middlewares"
	"github.com/karnerfly/pretkotha/pkg/repositories"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/karnerfly/pretkotha/pkg/validators"
)

func Initialize(router *gin.Engine, client *sql.DB) {
	router.GET("/_health", func(ctx *gin.Context) {
		utils.SendSuccessResponse(ctx, gin.H{"message": "OK"}, http.StatusOK)
	})

	router.POST("/_health", func(ctx *gin.Context) {
		var data any

		err := utils.FromJSONRequest(ctx.Request.Body, &data)
		if err != nil {
			utils.SendErrorResponse(ctx, err.Error(), http.StatusBadRequest)
			return
		}

		utils.SendSuccessResponse(ctx, data, http.StatusOK)
	})

	userRouter := router.Group("/api/user")
	userMiddleware := getUserMiddleware()
	userHandler := getUserHandler(client)

	userRouter.POST("/register", userMiddleware.ValidateRegister, userHandler.HandleUserRegister)
	userRouter.POST("", userHandler.HandleUserLogin)

	router.NoRoute(func(ctx *gin.Context) {
		utils.SendNotFoundResponse(ctx, "404 not found")
	})
}

func getUserHandler(client *sql.DB) *handlers.UserHandler {
	userRepo := repositories.NewUserRepo(client)
	userService := services.NewUserService(userRepo)
	return handlers.NewUserHander(userService)
}

func getUserMiddleware() *middlewares.UserMiddleware {
	v := validators.NewUserValidator()
	return middlewares.NewUserMiddleware(v)
}
