package validators

import (
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type PostValidatorInterface interface {
	ValidatePostId(id string) error
	ValidateCreatePost(req *models.CreatePostPayload) error
}

type PostValidator struct {
	validator *validator.Validate
}

func NewPostValidator() *PostValidator {
	return &PostValidator{
		validator: validator.New(),
	}
}

func (v *PostValidator) ValidatePostId(id string) error {
	return v.validator.Var(id, "required,uuid")
}

func (v *PostValidator) ValidateCreatePost(req *models.CreatePostPayload) error {
	sanitizePostCreationInput(req)
	return v.validator.Struct(req)
}

func sanitizePostCreationInput(req *models.CreatePostPayload) {
	req.Title = strings.TrimSpace(req.Title)
	req.Description = strings.TrimSpace(req.Description)
	req.Category = strings.TrimSpace(strings.ToLower(req.Category))
	req.Kind = strings.TrimSpace(strings.ToLower(req.Kind))
}
