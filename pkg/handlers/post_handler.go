package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/db"
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

func (h *PostHandler) GetPopularPosts(ctx *gin.Context) {
	posts, err := h.postService.GetPopularPosts(12)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}

func (h *PostHandler) GetPostById(ctx *gin.Context) {
	postId := ctx.Param("postId")

	posts, err := h.postService.GetPostById(postId)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			utils.SendErrorResponse(ctx, ErrNotFound.Error(), http.StatusNotFound)
		}
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}
