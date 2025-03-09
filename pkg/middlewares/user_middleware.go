package middlewares

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserMiddleware struct {
}

func NewUserMiddleware() *UserMiddleware {
	return &UserMiddleware{}
}

func (middleware *UserMiddleware) ValidateAvatarUpload(ctx *gin.Context) {
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

func (middleware *UserMiddleware) ValidateUpdateUserProfile(ctx *gin.Context) {
	req := &models.UpdateUserPayload{}
	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
		ctx.Abort()
		return
	}

	sanitizeUserProfileUpdateInput(req)

	ctx.Set("data", req)
	ctx.Next()
}

func sanitizeUserProfileUpdateInput(req *models.UpdateUserPayload) {
	req.UserName = strings.TrimSpace(req.UserName)
	req.Bio = strings.TrimSpace(req.Bio)
	req.Phone = strings.TrimSpace(req.Phone)
}
