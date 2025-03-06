package handlers

import "errors"

type HttpError error

var (
	ErrInternalServer HttpError = errors.New("internal server error")
	ErrBadRequest     HttpError = errors.New("bad request")
	ErrConflict       HttpError = errors.New("conflict")
	ErrUnAuthorized   HttpError = errors.New("unauthorized")
	ErrForbidden      HttpError = errors.New("forbidden")
	ErrNotFound       HttpError = errors.New("not found")
)
