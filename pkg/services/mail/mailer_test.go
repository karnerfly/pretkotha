package mail

import (
	"context"
	"testing"
	"time"
)

func TestSendOtpMail(t *testing.T) {
	opt := Option{}
	m := NewMailService(opt)
	ctx, cancle := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancle()

	err := m.SendOtpMail(ctx, "toufique26ajay@gmail.com", "123456")
	if err != nil {
		t.Fatal(err)
	}
}
