package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserMiddleware struct {
}

func NewUserMiddleware() *UserMiddleware {
	return &UserMiddleware{}
}

func (middleware *UserMiddleware) ValidateAvatarUpload(ctx *gin.Context) {
	// body := ctx.Request.Body

	contentType := ctx.GetHeader("Content-Type")

	if contentType == "" && contentType != "image/png" && contentType != "image/jpg" && contentType != "image/jpeg" {
		utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
		ctx.Abort()
		return
	}

	if ctx.Request.ContentLength == 0 {
		utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
		ctx.Abort()
		return
	}

	ctx.Next()
}
