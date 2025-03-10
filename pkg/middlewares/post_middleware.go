package middlewares

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/enum"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/models"
	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/karnerfly/pretkotha/pkg/validators"
)

type PostMiddleware struct {
	validator validators.PostValidatorInterface
}

func NewPostMiddleware(v validators.PostValidatorInterface) *PostMiddleware {
	return &PostMiddleware{validator: v}
}

func (middleware *PostMiddleware) ValidatePostId(ctx *gin.Context) {
	postId := ctx.Param("postId")
	err := middleware.validator.ValidatePostId(postId)
	if err != nil {
		utils.SendNotFoundResponse(ctx, handlers.ErrNotFound.Error())
		ctx.Abort()
		return
	}

	ctx.Next()
}

func (middleware *PostMiddleware) ValidatePostPagination(ctx *gin.Context) {

	var (
		err       error
		nPage     int
		nLimit    int
		nSortBy   enum.Sort
		nFilterBy enum.Filter
	)

	page := ctx.Query("page")
	limit := ctx.Query("limit")
	sortBy := ctx.Query("sort_by")
	filterBy := ctx.Query("filter_by")

	if page == "" {
		nPage = 1
	} else {
		nPage, err = strconv.Atoi(page)
		if err != nil {
			utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
			ctx.Abort()
			return
		}

		if nPage < 1 {
			utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
			ctx.Abort()
			return
		}
	}

	if limit == "" {
		nLimit = 20 // set limit to 20
	} else {
		nLimit, err = strconv.Atoi(limit)
		if err != nil {
			utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
			ctx.Abort()
			return
		}

		if nLimit < 1 || nLimit > 50 {
			nLimit = 20
		}
	}

	switch sortBy {
	case "newest", "":
		nSortBy = enum.PostSortNewest
	case "oldest":
		nSortBy = enum.PostSortOldest
	case "mostPopular":
		nSortBy = enum.PostSortMostPopular
	default:
		utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
		ctx.Abort()
		return
	}

	switch filterBy {
	case "all", "":
		nFilterBy = enum.PostFilterAll
	case "story":
		nFilterBy = enum.PostFilterStory
	case "drawing":
		nFilterBy = enum.PostFilterDrawing
	default:
		utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
		ctx.Abort()
		return
	}

	param := &models.GetPostsParam{
		Page:     nPage,
		Limit:    nLimit,
		SortBy:   nSortBy,
		FilterBy: nFilterBy,
	}

	ctx.Set("data", param)
	ctx.Next()
}

func (middleware *PostMiddleware) ValidateCreatePost(ctx *gin.Context) {
	req := &models.CreatePostPayload{}

	err := utils.ValidateJSON(ctx, req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	err = middleware.validator.ValidateCreatePost(req)
	if err != nil {
		utils.SendErrorResponse(ctx, "invalid json payload", http.StatusBadRequest)
		ctx.Abort()
		return
	}

	ctx.Set("data", req)
	ctx.Next()
}

func (middleware *PostMiddleware) ValidateThumbnailUpload(ctx *gin.Context) {
	postId := ctx.Param("postId")
	err := middleware.validator.ValidatePostId(postId)
	if err != nil {
		utils.SendNotFoundResponse(ctx, handlers.ErrNotFound.Error())
		ctx.Abort()
		return
	}

	contentType := ctx.GetHeader("Content-Type")

	if contentType == "" && contentType != "image/png" && contentType != "image/jpg" && contentType != "image/jpeg" {
		utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
		ctx.Abort()
		return
	}

	if ctx.Request.ContentLength == 0 {
		utils.SendErrorResponse(ctx, handlers.ErrBadRequest.Error(), http.StatusBadRequest)
		ctx.Abort()
		return
	}

	ctx.Set("postId", postId)
	ctx.Next()
}
