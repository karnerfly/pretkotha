package mailqueue

import (
	"errors"

	"github.com/karnerfly/pretkotha/pkg/logger"
)

type QueueType int

const (
	TypeOtp = iota
	TypeEvent
)

type MailPayload struct {
	To   string
	Data any
}

type Worker func(payload *MailPayload) error

type mailQueue struct {
	ch [2]chan *MailPayload
}

var queue *mailQueue

func NewMailPaylod(to string, data any) *MailPayload {
	return &MailPayload{
		To:   to,
		Data: data,
	}
}

func Init() {
	queue = &mailQueue{
		ch: [2]chan *MailPayload{
			make(chan *MailPayload),
			make(chan *MailPayload),
		},
	}
}

func Enqueue(qt QueueType, payload *MailPayload) error {
	if queue == nil {
		return errors.New("mail queue is not initialized")
	}
	queue.ch[qt] <- payload

	return nil
}

func Dequeue(qt QueueType) (*MailPayload, error) {
	if queue == nil {
		return nil, errors.New("mail queue is not initialized")
	}

	return <-queue.ch[qt], nil
}

func RegisterWorker(qt QueueType, fn Worker) {
	go func() {
		for paylod := range queue.ch[qt] {
			if err := fn(paylod); err != nil {
				logger.ERROR(err.Error())
			}
		}
	}()

	logger.INFO("Worker Registered Successfully for Mail Type: " + qt.String())
}

func (qt QueueType) String() string {
	return [...]string{"OTP", "EVENT"}[qt]
}
