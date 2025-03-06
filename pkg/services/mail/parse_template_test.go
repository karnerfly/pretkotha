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

	msg, err := s.getOtpTemplate("toufique26ajay@gmail.com", "123456")
	if err != nil {
		t.Fatal(err)
	}

	t.Log(string(msg))
}
