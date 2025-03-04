package utils

import (
	"encoding/json"
	"io"
	"net/http"
	"regexp"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/karnerfly/pretkotha/pkg/logger"
)

func SendErrorResponse(c *gin.Context, err string, code int) {
	c.JSON(code, gin.H{"error": err})
}

func SendServerErrorResponse(c *gin.Context, err error) {
	logger.ERROR(err.Error())
	SendErrorResponse(c, err.Error(), http.StatusInternalServerError)
}

func SendNotFoundResponse(c *gin.Context, err string) {
	SendErrorResponse(c, err, http.StatusNotFound)
}

func SendSuccessResponse(c *gin.Context, data any, code int) {
	c.JSON(code, data)
}

func ToJSON(data any) ([]byte, error) {
	return json.Marshal(data)
}

func FromJSON(data []byte, v any) error {
	return json.Unmarshal(data, v)
}

func FromJSONRequest(r io.ReadCloser, data any) error {
	defer r.Close()
	decoder := json.NewDecoder(r)
	return decoder.Decode(data)
}

func ToJSONResponse(w io.Writer, data any) error {
	encoder := json.NewEncoder(w)
	return encoder.Encode(data)
}

func ValidateJSON(c *gin.Context, data any) error {
	if err := c.ShouldBindJSON(data); err != nil {
		return err
	}
	return nil
}

func CreateSlug(title string) string {
	reg, err := regexp.Compile("[^a-zA-Z0-9]+")
	if err != nil {
		return ""
	}
	ps := reg.ReplaceAllString(title, " ")
	ps = strings.TrimSpace(ps)
	slug := strings.ReplaceAll(ps, " ", "-")
	slug = strings.ToLower(slug)
	return slug
}
