package mail

import (
	"bytes"
	"fmt"
	"html/template"
	"path/filepath"
	"strings"
)

func (s *MailService) ParseTemplate() error {
	p, err := filepath.Abs("templates/*.tmpl")
	if err != nil {
		return err
	}

	files, err := filepath.Glob(p)
	if err != nil {
		return err
	}

	for _, file := range files {
		fileName := strings.Split(filepath.Base(file), ".")[0]
		tx, err := template.ParseFiles(file)
		if err != nil {
			return err
		}

		s.Templates[fileName] = tx
	}

	return nil
}

func (s *MailService) getOtpTemplate(to, otp string) []byte {
	// s.ParseTemplate() // for only testing
	tx := s.Templates["otp"]
	var buffer bytes.Buffer

	err := tx.Execute(&buffer, otp)
	if err != nil {
		return nil
	}

	data := []byte(fmt.Sprintf("To: %s\r\n", to) +
		fmt.Sprintf("From: %s\r\n", s.Option.From) +
		"Subject: Verify Email\r\n" +
		"Content-Type: text/html; charset=UTF-8\r\n\r\n" +
		buffer.String(),
	)

	return data
}
