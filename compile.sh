#!/bin/bash

# Detect architecture
ARCH=$(uname -m)
INPUT_PATH="./cmd/web/"

# Normalize architecture name for Go
if [ "$ARCH" = "x86_64" ]; then
    ARCH="amd64"
elif [ "$ARCH" = "aarch64" ]; then
    ARCH="arm64"
elif [ "$ARCH" = "x86" ]; then
    ARCH="386"
else
    echo "Unsupported architecture: $ARCH"
    exit 1
fi

# Output file names
WIN_OUTPUT="bin/windows/main.exe"
LINUX_OUTPUT="bin/linux/main"

# Create output directories
mkdir -p bin/windows bin/linux

echo "Compiling binaries for Architecture: " + $ARCH

# Build for Windows
echo "Building for Windows..."
GOOS=windows GOARCH=$ARCH go build -o $WIN_OUTPUT $INPUT_PATH

# Build for Linux
echo "Building for Linux..."
GOOS=linux GOARCH=$ARCH go build -o $LINUX_OUTPUT $INPUT_PATH

echo "Build complete!"
