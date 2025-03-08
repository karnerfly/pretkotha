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
	router.Use(gin.Recovery())

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

	// authentication router
	authRouter := router.Group("/api/auth")
	authMiddleware := getAuthMiddleware()
	authHandler := getAuthHandler(client)

	authRouter.POST("/register", authMiddleware.ValidateRegister, authHandler.HandleUserRegister)
	authRouter.POST("/otp/verify", authMiddleware.ValidateVerifyOtp, authHandler.HandleVerifyOtp)
	authRouter.POST("/otp/resend", authMiddleware.ValidateSendOtp, authHandler.HandleSendOtp)
	authRouter.POST("/login", authMiddleware.ValidateLogin, authHandler.HandleUserLogin)

	// user router
	userRouter := router.Group("/api/user")
	userHandler := getUserHandler(client)

	userRouter.GET("/me", authMiddleware.Protect, userHandler.GetUser)

	// posts router
	postRouter := router.Group("/api/posts")
	postHandler := getPostHandler(client)
	postMiddleware := getPostMiddleware()

	postRouter.GET("", postMiddleware.ValidatePostPagination, postHandler.GetAllPosts)
	postRouter.GET("/latest", postHandler.GetLatestPosts)
	postRouter.GET("/popular", postHandler.GetPopularPosts)
	postRouter.GET("/:postId", postMiddleware.ValidatePostId, postHandler.GetPostById)

	router.NoRoute(func(ctx *gin.Context) {
		utils.SendNotFoundResponse(ctx, "404 not found")
	})
}

func getAuthHandler(client *sql.DB) *handlers.AuthHandler {
	userRepo := repositories.NewUserRepo(client)
	authService := services.NewAuthService(userRepo)
	return handlers.NewAuthHander(authService)
}

func getAuthMiddleware() *middlewares.AuthMiddleware {
	v := validators.NewAuthValidator()
	return middlewares.NewAuthMiddleware(v)
}

func getUserHandler(client *sql.DB) *handlers.UserHandler {
	userRepo := repositories.NewUserRepo(client)
	userService := services.NewUserService(userRepo)
	return handlers.NewUserHander(userService)
}

func getPostHandler(client *sql.DB) *handlers.PostHandler {
	postRepo := repositories.NewPostRepo(client)
	postService := services.NewPostService(postRepo)
	return handlers.NewPostHandler(postService)
}

func getPostMiddleware() *middlewares.PostMiddleware {
	v := validators.NewPostValidator()
	return middlewares.NewPostMiddleware(v)
}
