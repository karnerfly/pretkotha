package validators

import (
	"github.com/Pureparadise56b/pretkotha/pkg/models"
	"github.com/go-playground/validator/v10"
)

type UserValidatorInterface interface {
	ValidateUserSignUp(*models.User) error
}

type UserValidator struct {
	validator *validator.Validate
}

func NewUserValidator() *UserValidator {
	return &UserValidator{
		validator: validator.New(),
	}
}

func (v *UserValidator) ValidateUserSignUp(user *models.User) error {
	return v.validator.Struct(user)
}
