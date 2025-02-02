# Detect architecture
$arch = $env:PROCESSOR_ARCHITECTURE
$inputPath = ".\cmd\web\"

if ($arch -eq "AMD64") {
    $arch = "amd64"
} elseif ($arch -eq "ARM64") {
    $arch = "arm64"
} elseif ($arch -eq "x86") {
    $arch = "386"
} else {
    Write-Host "Unsupported architecture: $arch"
    exit 1
}

# Output file names
$winOutput = "bin/windows/main.exe"
$linuxOutput = "bin/linux/main"

Write-Host "Compiling binaries for Architecture: $arch"

# Build for Windows
Write-Host "Building for Windows..."
$env:GOOS = "windows"
$env:GOARCH = $arch
go build -o $winOutput $inputPath

# Build for Linux
Write-Host "Building for Linux..."
$env:GOOS = "linux"
$env:GOARCH = $arch
go build -o $linuxOutput $inputPath

Write-Host "Build complete!"
