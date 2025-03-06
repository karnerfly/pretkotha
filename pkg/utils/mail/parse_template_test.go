package mail

import (
	"testing"
)

func TestParseTemplate(t *testing.T) {
	s := NewMailService(Option{})

	err := s.ParseTemplate()
	if err != nil {
		t.Error(err)
	}
}

func TestGetOtpTemplate(t *testing.T) {
	s := NewMailService(Option{})

	msg := s.getOtpTemplate("toufique26ajay@gmail.com", "123456")
	if msg == nil {
		t.Fatal("message body is empty")
	}

	t.Log(string(msg))
}
