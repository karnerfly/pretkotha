package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserHandler struct {
	userService services.UserServiceInterface
}

func NewUserHander(userService services.UserServiceInterface) *UserHandler {
	return &UserHandler{userService}
}

func (handler *UserHandler) HandleGetUser(ctx *gin.Context) {
	data, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}
	id := data.(string)
	user, err := handler.userService.GetUser(ctx.Request.Context(), id)
	if err != nil {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	utils.SendSuccessResponse(ctx, user, http.StatusOK)
}

func (handler *UserHandler) HandleUploadUserAvatar(ctx *gin.Context) {
	data, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	id := data.(string)
	body := ctx.Request.Body
	extension := strings.Split(ctx.GetHeader("Content-Type"), "/")[1]

	err := handler.userService.UploadAvatar(ctx.Request.Context(), id, extension, body)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "upload_avatar",
	}, http.StatusOK)
}

func (handler *UserHandler) HandleDeleteUserAvatar(ctx *gin.Context) {
	data, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	id := data.(string)

	err := handler.userService.DeleteAvatar(ctx.Request.Context(), id)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "delete_avatar",
	}, http.StatusOK)
}

func (handler *UserHandler) HandleUpdateUserProfile(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	sub, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	req := data.(*models.UpdateUserPayload)
	id := sub.(string)

	err := handler.userService.UpdateUserProfile(ctx.Request.Context(), id, req)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "update_user",
	}, http.StatusOK)
}

func (handler *UserHandler) HandleGetUserStatus(ctx *gin.Context) {
	sub, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	id := sub.(string)

	role, err := handler.userService.GetUserRole(ctx.Request.Context(), id)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]any{
		"message":       "OK",
		"role":          role,
		"authenticated": true,
		"page":          "user_status",
	}, http.StatusOK)
}
