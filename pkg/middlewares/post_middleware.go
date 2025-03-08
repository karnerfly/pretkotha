package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/handlers"
	"github.com/karnerfly/pretkotha/pkg/utils"
	"github.com/karnerfly/pretkotha/pkg/validators"
)

type PostMiddleware struct {
	validator validators.PostValidatorInterface
}

func NewPostMiddleware(v validators.PostValidatorInterface) *PostMiddleware {
	return &PostMiddleware{validator: v}
}

func (m *PostMiddleware) ValidatePostId(ctx *gin.Context) {
	postId := ctx.Param("postId")
	err := m.validator.ValidatePostId(postId)
	if err != nil {
		utils.SendNotFoundResponse(ctx, handlers.ErrNotFound.Error())
		ctx.Abort()
		return
	}

	ctx.Next()
}
