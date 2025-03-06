package handlers

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/enum/httperr"
	"github.com/karnerfly/pretkotha/pkg/logger"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserHandler struct {
	userService services.UserServiceInterface
}

func NewUserHander(client *sql.DB) *UserHandler {
	return &UserHandler{
		userService: services.NewUserService(client),
	}
}

func (h *UserHandler) HandleUserRegister(ctx *gin.Context) {

	var req = &models.CreateUserRequest{}
	err := utils.FromJSONRequest(ctx.Request.Body, req)

	if err != nil {
		logger.ERROR(err.Error())
		utils.SendErrorResponse(ctx, "bad request, cannot parse body", http.StatusBadRequest)
		return
	}

	err = h.userService.Register(req)

	if err != nil {
		if errors.Is(err, httperr.ErrConflict) {
			utils.SendErrorResponse(ctx, "bad request, duplicate entry", http.StatusConflict)
			return
		} else {
			utils.SendServerErrorResponse(ctx, err)
			return
		}
	}

	ctx.JSON(http.StatusCreated, map[string]any{
		"status": "ok",
		"page":   "register",
	})
}

func (h *UserHandler) HandleUserLogin(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, map[string]any{
		"status": "ok",
		"page":   "login",
	})
}
