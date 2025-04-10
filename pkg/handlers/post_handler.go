package handlers

import (
	"errors"
	"mime/multipart"
	"net/http"
	"strings"

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

func (h *PostHandler) HandleGetLatestPosts(ctx *gin.Context) {
	posts, err := h.postService.GetLatestPosts(ctx.Request.Context(), 12)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}

func (h *PostHandler) HandleGetPopularPosts(ctx *gin.Context) {
	posts, err := h.postService.GetPopularPosts(ctx.Request.Context(), 12)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, posts, http.StatusOK)
}

func (h *PostHandler) HandleGetAllPosts(ctx *gin.Context) {
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

func (h *PostHandler) HandleGetPostById(ctx *gin.Context) {
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

func (h *PostHandler) HandleUploadStory(ctx *gin.Context) {
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

	id, err := h.postService.CreateStory(ctx.Request.Context(), id, req)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"id":      id,
		"message": "CREATED",
		"page":    "create_story",
	}, http.StatusCreated)
}

func (h *PostHandler) HandleUploadDrawing(ctx *gin.Context) {
	sub, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	data, exists := ctx.Get("req")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	fileExt, exists := ctx.Get("fileExt")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	f, exists := ctx.Get("file")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	id := sub.(string)
	req := data.(*models.CreatePostPayload)
	file := f.(multipart.File)
	extension := fileExt.(string)

	drawingId, err := h.postService.CreateDrawing(ctx.Request.Context(), id, extension, req, file)
	if err != nil {
		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"id":      drawingId,
		"message": "CREATED",
		"page":    "create_drawing",
	}, http.StatusCreated)
}

func (h *PostHandler) HandleUploadThumbnail(ctx *gin.Context) {
	data, exists := ctx.Get("sub")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	postId, exists := ctx.Get("postId")
	if !exists {
		utils.SendServerErrorResponse(ctx, ErrInternalServer)
		return
	}

	id := data.(string)
	pId := postId.(string)
	body := ctx.Request.Body
	extension := strings.Split(ctx.GetHeader("Content-Type"), "/")[1]

	err := h.postService.UpdatePostThumbnail(ctx.Request.Context(), id, pId, extension, body)
	if err != nil {
		if errors.Is(err, db.ErrRecordNotFound) {
			utils.SendErrorResponse(ctx, ErrBadRequest.Error(), http.StatusBadRequest)
			return
		}

		utils.SendServerErrorResponse(ctx, err)
		return
	}

	utils.SendSuccessResponse(ctx, map[string]string{
		"message": "OK",
		"page":    "upload_thumbnail",
	}, http.StatusOK)
}
