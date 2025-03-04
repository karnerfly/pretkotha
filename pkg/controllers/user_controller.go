package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

func GetUserHandler(ctx *gin.Context) {
	user := models.User{
		ID:       uuid.New(),
		Name:     "Toufique Al Ajay",
		Email:    "toufique26ajay@gmail.com",
		Password: "ajay@9339",
		Avatar:   "pic",
	}
	utils.SendSuccessResponse(ctx, user, http.StatusOK)
}

func PostUserHandler(ctx *gin.Context) {

	user := &models.User{}
	utils.FromJSONRequest(ctx.Request.Body, user)

	utils.SendSuccessResponse(ctx, user, http.StatusOK)
}
