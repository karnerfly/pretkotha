package mail

import (
	"context"
	"testing"
	"time"
)

func TestSendOtpMail(t *testing.T) {
	opt := Option{
		SmtpUsername:   "toufiquealajay64@gmail.com",
		SmtpPassword:   "imbn eecm acss ruzy",
		SmtpHost:       "smtp.gmail.com",
		SmtpServerAddr: "smtp.gmail.com:587",
		From:           "Pretkotha toufiquealajay64@gmail.com",
	}
	m := NewMailService(opt)
	ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancle()

	err := m.SendOtpMail(ctx, "toufique26ajay@gmail.com", "123456")
	if err != nil {
		t.Fatal(err)
	}
}
