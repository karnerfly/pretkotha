package validators

import (
	"github.com/go-playground/validator/v10"
	"github.com/karnerfly/pretkotha/pkg/models"
)

type AuthValidatorInterface interface {
	ValidateSendOtp(req *models.SendOtpPayload) error
	ValidateVerifyOtp(req *models.VerifyOtpPayload) error
	ValidateUserRegister(req *models.CreateUserPayload) error
	ValidateUserLogin(req *models.LoginUserPayload) error
}

type AuthValidator struct {
	validator *validator.Validate
}

func NewAuthValidator() *AuthValidator {
	return &AuthValidator{
		validator: validator.New(),
	}
}

func (v *AuthValidator) ValidateSendOtp(req *models.SendOtpPayload) error {
	return v.validator.Struct(req)
}

func (v *AuthValidator) ValidateVerifyOtp(req *models.VerifyOtpPayload) error {
	return v.validator.Struct(req)
}

func (v *AuthValidator) ValidateUserRegister(req *models.CreateUserPayload) error {
	return v.validator.Struct(req)
}

func (v *AuthValidator) ValidateUserLogin(req *models.LoginUserPayload) error {
	return v.validator.Struct(req)
}
