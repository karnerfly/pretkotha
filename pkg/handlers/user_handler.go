package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserHandler struct {
	userService services.UserServiceInterface
}

func NewUserHander(userService services.UserServiceInterface) *UserHandler {
	return &UserHandler{userService}
}

func (h *UserHandler) GetUser(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}
	id := data.(string)
	user, err := h.userService.GetUser(ctx.Request.Context(), id)
	if err != nil {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	utils.SendSuccessResponse(ctx, user, http.StatusOK)
}

func (h *UserHandler) UploadUserAvatar(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	id := data.(string)
	body := ctx.Request.Body
	extension := strings.Split(ctx.GetHeader("Content-Type"), "/")[1]

	err := h.userService.UploadAvatar(ctx.Request.Context(), id, extension, body)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "upload_avatar",
	}, http.StatusOK)
}

func (h *UserHandler) DeleteUserAvatar(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	id := data.(string)

	err := h.userService.DeleteAvatar(ctx.Request.Context(), id)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "delete_avatar",
	}, http.StatusOK)
}
