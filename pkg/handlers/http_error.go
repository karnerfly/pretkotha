package handlers

import "errors"

type HttpError error

var (
	ErrInternalServer HttpError = errors.New("500 internal server error")
	ErrBadRequest     HttpError = errors.New("400 bad request")
	ErrConflict       HttpError = errors.New("409 conflict")
	ErrUnAuthorized   HttpError = errors.New("401 unauthorized")
	ErrForbidden      HttpError = errors.New("403 forbidden")
	ErrNotFound       HttpError = errors.New("404 not found")
)
