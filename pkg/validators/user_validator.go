package validators

import (
	"github.com/go-playground/validator/v10"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type UserValidatorInterface interface {
	ValidateUserRegister(*models.CreateUserPayload) error
	ValidateUserLogin(req *models.LoginUserPayload) error
}

type UserValidator struct {
	validator *validator.Validate
}

func NewUserValidator() *UserValidator {
	return &UserValidator{
		validator: validator.New(),
	}
}

func (v *UserValidator) ValidateUserRegister(req *models.CreateUserPayload) error {
	return v.validator.Struct(req)
}

func (v *UserValidator) ValidateUserLogin(req *models.LoginUserPayload) error {
	return v.validator.Struct(req)
}
