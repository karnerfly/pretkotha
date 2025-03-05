package router

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/utils"
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
	userHandler := handlers.NewUserHander(client)

	userRouter.GET("/register", userHandler.HandleUserRegister)
	userRouter.POST("", userHandler.HandleUserLogin)

	router.NoRoute(func(ctx *gin.Context) {
		utils.SendNotFoundResponse(ctx, "404 not found")
	})
}
