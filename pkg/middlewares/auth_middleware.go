package middlewares

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/session"
	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/karnerfly/pretkotha/pkg/validators"
)

type AuthMiddleware struct {
	validator validators.AuthValidatorInterface
	config    *configs.Config
}

func NewAuthMiddleware(v validators.AuthValidatorInterface) *AuthMiddleware {
	return &AuthMiddleware{
		validator: v,
		config:    configs.New(),
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

func (m *AuthMiddleware) ValidateLogin(ctx *gin.Context) {
	req := &models.LoginUserPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = m.validator.ValidateUserLogin(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (m *AuthMiddleware) Protect(ctx *gin.Context) {
	authToken, err := ctx.Cookie("auth_token")
	if err != nil {
		utils.SendErrorResponse(ctx, handlers.ErrForbidden.Error(), http.StatusForbidden)
		ctx.Abort()
		return
	}
	sessionId, err := ctx.Cookie("user_session")
	if err != nil {
		utils.SendErrorResponse(ctx, handlers.ErrForbidden.Error(), http.StatusForbidden)
		ctx.Abort()
		return
	}

	var data map[string]any

	sctx, sc := session.GetIdleTimeoutContext()
	defer sc()
	err = session.DeSerialize(sctx, sessionId, &data)
	if err != nil {
		if err == session.Nil {
			ctx.SetCookie("auth_token", "", -1, "/", m.config.Domain, false, true)
			ctx.SetCookie("user_session", "", -1, "/", m.config.Domain, false, true)
			utils.SendErrorResponse(ctx, handlers.ErrUnAuthorized.Error(), http.StatusUnauthorized)
			ctx.Abort()
			return
		}
		utils.SendErrorResponse(ctx, handlers.ErrForbidden.Error(), http.StatusForbidden)
		ctx.Abort()
		return
	}

	storedToken, ok := data["token"]
	if !ok || authToken != storedToken {
		ctx.SetCookie("auth_token", "", -1, "/", m.config.Domain, false, true)
		utils.SendErrorResponse(ctx, handlers.ErrUnAuthorized.Error(), http.StatusUnauthorized)
		ctx.Abort()
		return
	}

	t, err := utils.VerifyJwtToken(authToken)
	sub, suberr := t.Claims.GetSubject()
	if suberr != nil {
		utils.SendErrorResponse(ctx, handlers.ErrForbidden.Error(), http.StatusForbidden)
		ctx.Abort()
		return
	}

	if err != nil {
		if !errors.Is(err, jwt.ErrTokenExpired) {
			utils.SendErrorResponse(ctx, handlers.ErrForbidden.Error(), http.StatusForbidden)
			ctx.Abort()
			return
		}

		newToken := utils.GenerateJwtToken(sub)
		data := map[string]any{
			"token":      newToken,
			"created_at": time.Now().Unix(),
			"expires_at": time.Now().Add(m.config.JwtExpiry).Unix(),
		}
		err := session.Update(sctx, sessionId, data)
		if err != nil {
			utils.SendErrorResponse(ctx, handlers.ErrForbidden.Error(), http.StatusForbidden)
			ctx.Abort()
			return
		}
		ctx.SetCookie("auth_token", newToken, m.config.AuthCookieExpiry, "/", m.config.Domain, false, true)
	}

	ctx.Set("data", sub)
	ctx.Next()
}
