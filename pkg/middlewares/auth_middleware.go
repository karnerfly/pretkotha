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
	validator   validators.AuthValidatorInterface
	config      configs.Config
	authSession session.SessionInterface
}

func NewAuthMiddleware(v validators.AuthValidatorInterface, s session.SessionInterface) *AuthMiddleware {
	return &AuthMiddleware{
		validator:   v,
		config:      configs.New(),
		authSession: s,
	}
}

func (middleware *AuthMiddleware) ValidateSendOtp(ctx *gin.Context) {
	req := &models.SendOtpPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = middleware.validator.ValidateSendOtp(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (middleware *AuthMiddleware) ValidateVerifyOtp(ctx *gin.Context) {
	req := &models.VerifyOtpPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = middleware.validator.ValidateVerifyOtp(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (middleware *AuthMiddleware) ValidateRegister(ctx *gin.Context) {
	req := &models.CreateUserPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = middleware.validator.ValidateUserRegister(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (middleware *AuthMiddleware) ValidateLogin(ctx *gin.Context) {
	req := &models.LoginUserPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = middleware.validator.ValidateUserLogin(req)
	if err != nil {
		ctx.Abort()
		utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (middleware *AuthMiddleware) Protect(ctx *gin.Context) {
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

	sessionCtx, sessionCancle := session.GetIdleTimeoutContext(ctx.Request.Context())
	defer sessionCancle()
	err = middleware.authSession.DeSerialize(sessionCtx, sessionId, &data)
	if err != nil {
		if err == session.Nil {
			ctx.SetCookie("auth_token", "", -1, "/", middleware.config.Domain, false, true)
			ctx.SetCookie("user_session", "", -1, "/", middleware.config.Domain, false, true)
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
		ctx.SetCookie("auth_token", "", -1, "/", middleware.config.Domain, false, true)
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
			"expires_at": time.Now().Add(time.Duration(middleware.config.JwtExpiry) * time.Second).Unix(),
		}
		err := middleware.authSession.Update(sessionCtx, sessionId, data)
		if err != nil {
			utils.SendErrorResponse(ctx, handlers.ErrForbidden.Error(), http.StatusForbidden)
			ctx.Abort()
			return
		}
		ctx.SetCookie("auth_token", newToken, int(middleware.config.AuthCookieExpiry), "/", middleware.config.Domain, false, true)
	}

	ctx.Set("sub", sub)
	ctx.Next()
}
