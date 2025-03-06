package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/queue/mailqueue"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type UserHandler struct {
	userService services.UserServiceInterface
}

func NewUserHander(userService services.UserServiceInterface) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

func (h *UserHandler) HandleUserRegister(ctx *gin.Context) {
	// data, exists := ctx.Get("data")
	// if !exists {
	// 	utils.SendServerErrorResponse(ctx, ErrInternalServer)
	// 	return
	// }
	// req := data.(*models.CreateUserPayload)

	// _, err := h.userService.Register(req)
	// if err != nil {
	// 	if errors.Is(err, db.ErrRecordAlreadyExists) {
	// 		utils.SendErrorResponse(ctx, "account already exists", http.StatusBadRequest)
	// 		return
	// 	} else {
	// 		utils.SendServerErrorResponse(ctx, err)
	// 		return
	// 	}
	// }
	p := &mailqueue.MailPayload{
		To:   "toufique26ajay@gmail.com",
		Data: "123456",
	}
	mailqueue.Enqueue(mailqueue.TypeOtp, p)

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "register",
	}, http.StatusOK)
}

func (h *UserHandler) HandleUserLogin(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, map[string]any{
		"status": "ok",
		"page":   "login",
	})
}
