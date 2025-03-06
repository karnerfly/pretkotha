package validators

import (
	"github.com/go-playground/validator/v10"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type UserValidatorInterface interface {
	ValidateUserSignUp(*models.CreateUserPayload) error
}

type UserValidator struct {
	validator *validator.Validate
}

func NewUserValidator() *UserValidator {
	return &UserValidator{
		validator: validator.New(),
	}
}

func (v *UserValidator) ValidateUserSignUp(req *models.CreateUserPayload) error {
	return v.validator.Struct(req)
}
