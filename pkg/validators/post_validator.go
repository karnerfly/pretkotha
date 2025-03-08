package validators

import "github.com/go-playground/validator/v10"

type PostValidatorInterface interface {
	ValidatePostId(id string) error
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
