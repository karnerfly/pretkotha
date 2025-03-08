package handlers

import (
	"net/http"

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
