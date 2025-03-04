package router

import (
	"net/http"

	"github.com/Pureparadise56b/pretkotha/pkg/controllers"
	"github.com/Pureparadise56b/pretkotha/pkg/utils"
	"github.com/gin-gonic/gin"
)

func Initialize(router *gin.Engine) {
	router.GET("/_health", func(ctx *gin.Context) {
		utils.SendSuccessResponse(ctx, gin.H{"message": "OK"}, http.StatusOK)
	})

	router.POST("/_health", func(ctx *gin.Context) {
		var data interface{}
		err := utils.FromJSONRequest(ctx.Request, data)
		if err != nil {
			utils.SendErrorResponse(ctx, err.Error(), http.StatusBadRequest)
			return
		}
		utils.SendSuccessResponse(ctx, data, http.StatusOK)
	})

	userRouter := router.Group("/api/user")

	userRouter.GET("", controllers.GetUserHandler)
	userRouter.POST("", controllers.PostUserHandler)

	router.NoRoute(func(ctx *gin.Context) {
		utils.SendNotFoundResponse(ctx, "404 not found")
	})
}
