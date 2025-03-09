package validators

import (
	"regexp"
	"strings"

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
	v := validator.New()
	v.RegisterValidation("phone", phoneValidation)

	return &AuthValidator{
		validator: v,
	}
}

func phoneValidation(fl validator.FieldLevel) bool {
	phone := fl.Field().String()
	re := regexp.MustCompile(`^\+?\d{10,15}$`)
	return re.MatchString(phone)
}

func (v *AuthValidator) ValidateSendOtp(req *models.SendOtpPayload) error {
	return v.validator.Struct(req)
}

func (v *AuthValidator) ValidateVerifyOtp(req *models.VerifyOtpPayload) error {
	return v.validator.Struct(req)
}

func (v *AuthValidator) ValidateUserRegister(req *models.CreateUserPayload) error {
	sanitizeUserRegistrationInput(req)
	return v.validator.Struct(req)
}

func (v *AuthValidator) ValidateUserLogin(req *models.LoginUserPayload) error {
	return v.validator.Struct(req)
}

func sanitizeUserRegistrationInput(req *models.CreateUserPayload) {
	req.UserName = strings.TrimSpace(req.UserName)
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.Bio = strings.TrimSpace(req.Bio)
	req.Phone = strings.TrimSpace(req.Phone)
}
