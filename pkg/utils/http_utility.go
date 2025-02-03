package utils

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/Pureparadise56b/pretkotha/pkg/logger"
	"github.com/gin-gonic/gin"
)

func SendErrorResponse(c *gin.Context, err string, code int) {
	c.Header("Content-Type", "application/json; charset=utf-8")
	c.JSON(code, gin.H{"error": err})
}

func SendServerErrorResponse(c *gin.Context, err error) {
	logger.ERROR(err.Error())
	SendErrorResponse(c, err.Error(), http.StatusInternalServerError)
}

func SendSuccessResponse(c *gin.Context, data any, code int) {
	c.Header("Content-Type", "application/json; charset=utf-8")
	c.JSON(code, data)
}

func ToJSON(data any) ([]byte, error) {
	return json.Marshal(data)
}

func FromJSON(data []byte, v any) error {
	return json.Unmarshal(data, v)
}

func FromJSONRequest(r *http.Request, data any) error {
	resp, err := io.ReadAll(r.Body)
	if err != nil {
		return nil
	}

	return FromJSON(resp, data)
}

func ValidateJSON(c *gin.Context, data any) error {
	if err := c.ShouldBindJSON(data); err != nil {
		return err
	}
	return nil
}
