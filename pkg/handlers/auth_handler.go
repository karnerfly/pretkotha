package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/configs"
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/session"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type AuthHandler struct {
	authService services.AuthServiceInterface
	config      *configs.Config
}

func NewAuthHander(userService services.AuthServiceInterface) *AuthHandler {
	return &AuthHandler{
		authService: userService,
		config:      configs.New(),
	}
}

func (h *AuthHandler) HandleSendOtp(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}
	req := data.(*models.SendOtpPayload)

	err := h.authService.SendOtp(req)
	if err != nil {
		switch err {
		case db.ErrRecordNotFound:
			utils.SendErrorResponse(ctx, "invalid email id", http.StatusBadRequest)
		case db.ErrRecordAlreadyExists:
			utils.SendErrorResponse(ctx, "account already activated", http.StatusBadRequest)
		default:
			utils.SendServerErrorResponse(ctx, err)
		}
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "send otp",
	}, http.StatusOK)
}

func (h *AuthHandler) HandleVerifyOtp(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}
	req := data.(*models.VerifyOtpPayload)

	err := h.authService.VerifyOtp(req)
	if err != nil {
		switch err {
		case services.ErrInvalidOtp:
			utils.SendErrorResponse(ctx, "invalid otp", http.StatusBadRequest)
		case services.ErrOtpNotMatch:
			utils.SendErrorResponse(ctx, "opt not matched", http.StatusBadRequest)
		default:
			utils.SendServerErrorResponse(ctx, err)
		}
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "verify otp",
	}, http.StatusOK)
}

func (h *AuthHandler) HandleUserRegister(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}
	req := data.(*models.CreateUserPayload)

	err := h.authService.Register(req)
	if err != nil {
		if errors.Is(err, db.ErrRecordAlreadyExists) {
			utils.SendErrorResponse(ctx, "account already exists", http.StatusBadRequest)
			return
		}
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "register",
	}, http.StatusOK)
}

func (h *AuthHandler) HandleUserLogin(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	req := data.(*models.LoginUserPayload)

	token, sessionId, err := h.authService.Login(req)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			utils.SendErrorResponse(ctx, "invalid credentials", http.StatusBadRequest)
			return
		}
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	ctx.SetCookie("auth_token", token, int(h.config.AuthCookieExpiry), "/", h.config.Domain, false, true)
	ctx.SetCookie("user_session", sessionId, int(h.config.SessionCookieExpiry), "/", h.config.Domain, false, true)

	ctx.JSON(http.StatusOK, map[string]any{
		"status":     "ok",
		"page":       "login",
		"auth_token": token,
	})
}

func (h *AuthHandler) HandleUserLogout(ctx *gin.Context) {
	sessionId, err := ctx.Cookie("user_session")
	if err != nil {
		utils.SendErrorResponse(ctx, ErrForbidden.Error(), http.StatusForbidden)
		return
	}

	sctx, cancle := session.GetIdleTimeoutContext()
	defer cancle()
	err = session.Remove(sctx, sessionId)
	if err != nil {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	ctx.SetCookie("auth_token", "", -1, "/", h.config.Domain, false, true)
	ctx.SetCookie("user_session", "", -1, "/", h.config.Domain, false, true)

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "logout",
	}, http.StatusOK)
}
