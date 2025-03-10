package validators

import (
	"fmt"
	"mime/multipart"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type PostValidatorInterface interface {
	ValidatePostId(id string) error
	ValidateUploadStory(req *models.CreatePostPayload) error
	ValidateUploadDrawing(form *multipart.Form) (*models.CreatePostPayload, error)
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

func (v *PostValidator) ValidateUploadStory(req *models.CreatePostPayload) error {
	sanitizePostCreationInput(req)
	valid := validateEnums(req)
	if !valid {
		return fmt.Errorf("invalid category")
	}

	return v.validator.Struct(req)
}

func (v *PostValidator) ValidateUploadDrawing(form *multipart.Form) (*models.CreatePostPayload, error) {
	req := &models.CreatePostPayload{}

	req.Title = parseDrawingFormFields(form, "title")
	req.Description = parseDrawingFormFields(form, "description")
	req.Category = parseDrawingFormFields(form, "category")

	sanitizePostCreationInput(req)
	valid := validateEnums(req)
	if !valid {
		return nil, fmt.Errorf("invalid category")
	}

	err := v.validator.Var(req.Title, "required,min=10,max=30")
	if err != nil {
		return nil, err
	}

	err = v.validator.Var(req.Description, "omitempty,max=60")
	if err != nil {
		return nil, err
	}

	_, ok := form.File["content"]
	if !ok {
		return nil, fmt.Errorf("content missing")
	}

	return req, nil
}

func sanitizePostCreationInput(req *models.CreatePostPayload) {
	req.Title = strings.TrimSpace(req.Title)
	req.Description = strings.TrimSpace(req.Description)
	req.Category = strings.TrimSpace(strings.ToLower(req.Category))
}

func parseDrawingFormFields(form *multipart.Form, field string) string {
	v, ok := form.Value[field]
	if !ok {
		return ""
	}

	if len(v) == 0 {
		return ""
	}

	return v[0]
}

func validateEnums(req *models.CreatePostPayload) bool {
	if req.Category != "horror" && req.Category != "thriller" && req.Category != "other" {
		return false
	}
	return true
}
