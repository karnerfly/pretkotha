all: compile run

compile:
ifeq ($(OS), Windows_NT)
	@powershell -ExecutionPolicy Bypass -File compile.ps1
else
	@chmod +x compile.sh && ./compile.sh
endif

run: compile
ifeq ($(OS), Windows_NT)
	@powershell -ExecutionPolicy Bypass ./bin/windows/main.exe
else
	Dected_OS := $(shell sh -c 'uname 2>/dev/null || echo Unknown')
	ifeq ($(Dected_OS), Linux)
		@bash chmod +x bin/linux/main ./bin/linux/main
	else
		echo "Unknown Platform, Cannot run the scripts."
	endif
endif

clean:
	