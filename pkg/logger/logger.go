package logger

import (
	"log"
	"os"
)

type Logger struct {
	ErrLogger  *log.Logger
	InfoLogger *log.Logger
}

var logger *Logger

func init() {
	Init()
}

func Init() {
	if logger == nil {
		logger = &Logger{
			ErrLogger:  log.New(os.Stderr, "ERROR :: ", log.LstdFlags),
			InfoLogger: log.New(os.Stdin, "INFO :: ", log.LstdFlags),
		}
	}
}

func INFO(message string) {
	logger.InfoLogger.Println(message)
}

func ERROR(err string) {
	logger.ErrLogger.Println(err)
}

func Printf(format string, args ...any) {
	logger.InfoLogger.Printf(format, args...)
}

func Errorf(format string, args ...any) {
	logger.ErrLogger.Printf(format, args...)
}

func Fatal(err error) {
	logger.ErrLogger.Fatal(err)
}
