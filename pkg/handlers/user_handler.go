package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

func GetUserHandler(ctx *gin.Context) {
	user := models.User{}
	utils.SendSuccessResponse(ctx, user, http.StatusOK)
}

func PostUserHandler(ctx *gin.Context) {

	user := &models.User{}
	utils.FromJSONRequest(ctx.Request.Body, user)

	utils.SendSuccessResponse(ctx, user, http.StatusOK)
}
