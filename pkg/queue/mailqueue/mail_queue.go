package mailqueue

import (
	"context"
	"errors"
	"sync"

	"github.com/karnerfly/pretkotha/pkg/logger"
)

type QueueError error

var (
	ErrNotInitialize    = errors.New("mail queue is not initialized")
	ErrInvalidQueueType = errors.New("invalid queue type")
	ErrBufferFull       = errors.New("mail queue is full, message dropped")
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
func init() {
	ctx, cancel := context.WithCancel(context.Background())
	bufferSize := 10
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
		return ErrNotInitialize
	}
	if qt < 0 || qt >= maxQueueType {
		return ErrInvalidQueueType
	}

	select {
	case queue.ch[qt] <- payload:
		return nil
	default:
		return ErrBufferFull
	}
}

func RegisterWorker(qt QueueType, fn Worker) error {
	if queue == nil {
		return ErrNotInitialize
	}
	if qt < 0 || qt >= maxQueueType {
		return ErrInvalidQueueType
	}

	queue.wg.Add(1)
	go func() {
		defer queue.wg.Done()
		logger.Printf("Worker started for queue: %s", qt)

		for {
			select {
			case payload := <-queue.ch[qt]:
				if err := fn(payload); err != nil {
					logger.Errorf("Worker error: %v", err)
				}
			case <-queue.ctx.Done():
				logger.Printf("Shutting down worker for queue: %s", qt)
				return
			}
		}
	}()

	return nil
}

func (qt QueueType) String() string {
	types := []string{"OTP", "EVENT"}
	if qt >= 0 && int(qt) < len(types) {
		return types[qt]
	}
	return "UNKNOWN"
}
