package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/karnerfly/pretkotha/pkg/validators"
)

type UserMiddleware struct {
	validator validators.UserValidatorInterface
}

func NewUserMiddleware(v validators.UserValidatorInterface) *UserMiddleware {
	return &UserMiddleware{
		validator: v,
	}
}

func (m *UserMiddleware) ValidateRegister(ctx *gin.Context) {
	req := &models.CreateUserPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = m.validator.ValidateUserRegister(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}
