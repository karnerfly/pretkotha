package mailqueue

import (
	"context"
	"errors"
	"sync"

	"github.com/karnerfly/pretkotha/pkg/logger"
)

type QueueType int

const (
	TypeOtp QueueType = iota
	TypeEvent
	maxQueueType // Prevents out-of-bounds errors
)

type MailPayload struct {
	To   string
	Data any
}

type Worker func(payload *MailPayload) error

type mailQueue struct {
	ch     [maxQueueType]chan *MailPayload
	ctx    context.Context
	cancel context.CancelFunc
	wg     sync.WaitGroup
}

var queue *mailQueue

// Initialize the queue with buffered channels
func Init(bufferSize int) {
	ctx, cancel := context.WithCancel(context.Background())
	queue = &mailQueue{
		ch: [maxQueueType]chan *MailPayload{
			make(chan *MailPayload, bufferSize),
			make(chan *MailPayload, bufferSize),
		},
		ctx:    ctx,
		cancel: cancel,
	}
}

func Shutdown() {
	if queue == nil {
		return
	}
	queue.cancel()
	queue.wg.Wait()
}

func Enqueue(qt QueueType, payload *MailPayload) error {
	if queue == nil {
		return errors.New("mail queue is not initialized")
	}
	if qt < 0 || qt >= maxQueueType {
		return errors.New("invalid queue type")
	}

	select {
	case queue.ch[qt] <- payload:
		return nil
	default:
		return errors.New("mail queue is full, message dropped")
	}
}

func RegisterWorker(qt QueueType, fn Worker) {
	if queue == nil {
		logger.ERROR("Mail queue is not initialized")
		return
	}
	if qt < 0 || qt >= maxQueueType {
		logger.ERROR("Invalid queue type for worker")
		return
	}

	queue.wg.Add(1)
	go func() {
		defer queue.wg.Done()
		logger.INFO("Worker started for queue: " + qt.String())

		for {
			select {
			case payload := <-queue.ch[qt]:
				if err := fn(payload); err != nil {
					logger.ERROR("Worker error: " + err.Error())
				}
			case <-queue.ctx.Done():
				logger.INFO("Shutting down worker for queue: " + qt.String())
				return
			}
		}
	}()
}

func (qt QueueType) String() string {
	types := []string{"OTP", "EVENT"}
	if qt >= 0 && int(qt) < len(types) {
		return types[qt]
	}
	return "UNKNOWN"
}
