package router

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/middlewares"
	"github.com/karnerfly/pretkotha/pkg/repositories"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/session"
	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/karnerfly/pretkotha/pkg/utils/store"
	"github.com/karnerfly/pretkotha/pkg/validators"
)

func Initialize(router *gin.Engine, client *sql.DB, s session.SessionInterface) {
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
	authMiddleware := getAuthMiddleware(s)
	authHandler := getAuthHandler(client, s)

	authRouter.POST("/register", authMiddleware.ValidateRegister, authHandler.HandleUserRegister)
	authRouter.POST("/otp/verify", authMiddleware.ValidateVerifyOtp, authHandler.HandleVerifyOtp)
	authRouter.POST("/otp/resend", authMiddleware.ValidateSendOtp, authHandler.HandleSendOtp)
	authRouter.POST("/login", authMiddleware.ValidateLogin, authHandler.HandleUserLogin)
	authRouter.POST("/logout", authMiddleware.Protect, authHandler.HandleUserLogout)

	// user router
	userRouter := router.Group("/api/users")
	userMiddleware := getUserMiddleware()
	userHandler := getUserHandler(client)

	userRouter.GET("/me", authMiddleware.Protect, userHandler.GetUser)
	userRouter.PUT("/avatar", userMiddleware.ValidateAvatarUpload, authMiddleware.Protect, userHandler.UploadUserAvatar)
	userRouter.DELETE("/avatar", authMiddleware.Protect, userHandler.DeleteUserAvatar)

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

func getAuthHandler(client *sql.DB, s session.SessionInterface) *handlers.AuthHandler {
	userRepo := repositories.NewUserRepo(client)
	authService := services.NewAuthService(userRepo, s)
	return handlers.NewAuthHander(authService)
}

func getAuthMiddleware(s session.SessionInterface) *middlewares.AuthMiddleware {
	v := validators.NewAuthValidator()
	return middlewares.NewAuthMiddleware(v, s)
}

func getUserHandler(client *sql.DB) *handlers.UserHandler {
	cfg := configs.New()
	localStore := store.NewLocalStorage(cfg.AvatarFilesBaseDir, 3145728)
	imgUtility := utils.NewImageUtility(localStore)
	userRepo := repositories.NewUserRepo(client)
	userService := services.NewUserService(userRepo, imgUtility)
	return handlers.NewUserHander(userService)
}

func getUserMiddleware() *middlewares.UserMiddleware {
	return middlewares.NewUserMiddleware()
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
