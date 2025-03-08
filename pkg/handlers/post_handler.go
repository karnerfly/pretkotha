package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/services"
	"github.com/karnerfly/pretkotha/pkg/utils"
)

type PostHandler struct {
	postService services.PostServiceInterface
}

func NewPostHandler(postService services.PostServiceInterface) *PostHandler {
	return &PostHandler{postService}
}

func (h *PostHandler) GetLatestPosts(ctx *gin.Context) {
	posts, err := h.postService.GetLatestPosts(12)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}
