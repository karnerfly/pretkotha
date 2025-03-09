package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
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
	posts, err := h.postService.GetLatestPosts(ctx.Request.Context(), 12)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}

func (h *PostHandler) GetPopularPosts(ctx *gin.Context) {
	posts, err := h.postService.GetPopularPosts(ctx.Request.Context(), 12)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}

func (h *PostHandler) GetAllPosts(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	params := data.(*models.GetPostsParam)

	posts, err := h.postService.GetAllPosts(ctx.Request.Context(), params)
	if err != nil {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}

func (h *PostHandler) GetPostById(ctx *gin.Context) {
	postId := ctx.Param("postId")

	posts, err := h.postService.GetPostById(ctx.Request.Context(), postId)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			utils.SendErrorResponse(ctx, ErrNotFound.Error(), http.StatusNotFound)
			return
		}
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}

func (h *PostHandler) CreatePost(ctx *gin.Context) {
	data, exists := ctx.Get("data")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}
	sub, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	req := data.(*models.CreatePostPayload)
	id := sub.(string)

	id, err := h.postService.CreatePost(ctx.Request.Context(), id, req)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"id":      id,
		"message": "CREATED",
		"page":    "create_post",
	}, http.StatusCreated)
}
