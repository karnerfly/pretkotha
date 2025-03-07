package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/karnerfly/pretkotha/pkg/validators"
)

type AuthMiddleware struct {
	validator validators.AuthValidatorInterface
}

func NewAuthMiddleware(v validators.AuthValidatorInterface) *AuthMiddleware {
	return &AuthMiddleware{
		validator: v,
	}
}

func (m *AuthMiddleware) ValidateSendOtp(ctx *gin.Context) {
	req := &models.SendOtpPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = m.validator.ValidateSendOtp(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (m *AuthMiddleware) ValidateVerifyOtp(ctx *gin.Context) {
	req := &models.VerifyOtpPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = m.validator.ValidateVerifyOtp(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (m *AuthMiddleware) ValidateRegister(ctx *gin.Context) {
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
