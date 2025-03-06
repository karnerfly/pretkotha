package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/queue/mailqueue"
	"github.com/karnerfly/pretkotha/pkg/services"
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

	// var req = &models.CreateUserPayload{}
	// err := utils.FromJSONRequest(ctx.Request.Body, req)

	// if err != nil {
	// 	logger.ERROR(err.Error())
	// 	utils.SendErrorResponse(ctx, "bad request, cannot parse body", http.StatusBadRequest)
	// 	return
	// }

	// err = h.userService.Register(req)

	// if err != nil {
	// 	if errors.Is(err, ErrConflict) {
	// 		utils.SendErrorResponse(ctx, "bad request, duplicate entry", http.StatusConflict)
	// 		return
	// 	} else {
	// 		utils.SendServerErrorResponse(ctx, err)
	// 		return
	// 	}
	// }

	p := mailqueue.NewMailPaylod("toufique26ajay@gmail.com", "123456")
	mailqueue.Enqueue(mailqueue.TypeOtp, p)

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
