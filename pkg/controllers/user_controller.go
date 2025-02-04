package controllers

import (
	"net/http"

	"github.com/Pureparadise56b/pretkotha/pkg/models"
	"github.com/Pureparadise56b/pretkotha/pkg/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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
	utils.FromJSONRequest(ctx.Request, user)

	utils.SendSuccessResponse(ctx, user, http.StatusOK)
}
