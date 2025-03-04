package logger

import (
	"log"
	"os"

	"github.com/karnerfly/pretkotha/types"
)

var logger *types.Logger

func Init() {
	logger = &types.Logger{
		ErrLogger:  log.New(os.Stderr, "ERROR :: ", log.LstdFlags),
		InfoLogger: log.New(os.Stdin, "INFO :: ", log.LstdFlags),
	}
}

func INFO(message string) {
	logger.InfoLogger.Println(message)
}

func ERROR(err string) {
	logger.ErrLogger.Println(err)
}

func Fatal(err error) {
	logger.ErrLogger.Fatal(err)
}
