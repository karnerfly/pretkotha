all: build run

migrate:
	@dbmate up

build:
ifeq ($(OS), Windows_NT)
	@setx GOOS windows
	@go build -o bin/windows/main.exe ./cmd/web/
else ifeq ($(shell uname 2>/dev/null), Linux)
	@export GOOS=linux
	@go build -o bin/linux/main ./cmd/web/
else ifeq ($(shell uname 2>/dev/null), Darwin)
	@export GOOS=darwin
	@go build -o bin/macos/main ./cmd/web/
endif

run: build
ifeq ($(OS), Windows_NT)
	@./bin/windows/main.exe
else ifeq ($(shell uname 2>/dev/null), Linux)
	@./bin/linux/main
else ifeq ($(shell uname 2>/dev/null), Darwin)
	@./bin/macos/main
endif

clean:
	@dbmate -e DATABASE_URL drop
	@rm -rf ./bin