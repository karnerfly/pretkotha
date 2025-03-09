package utils

import (
	"bytes"
	"errors"
	"image"
	"image/jpeg"
	"image/png"
	"io"
	"path/filepath"
	"strings"
	"sync"

	"github.com/karnerfly/pretkotha/pkg/utils/store"
	"github.com/nfnt/resize"
)

type ImageError error

var (
	ErrInvalidFileType ImageError = errors.New("invalid file format")
)

type ImageUtilityInterface interface {
	ResizeAndSave(path string, body io.Reader) error
	Remove(path string) error
	ImageToReader(img image.Image, format string) (io.Reader, error)
}

type ImageUtility struct {
	storage store.Storage
}

var bufferPool = sync.Pool{
	New: func() interface{} {
		return new(bytes.Buffer)
	},
}

func NewImageUtility(s store.Storage) *ImageUtility {
	return &ImageUtility{s}
}

func (utility *ImageUtility) ResizeAndSave(path string, body io.Reader) error {
	var (
		img image.Image
		err error
	)

	ft := strings.Split(filepath.Base(path), ".")[1:]
	if len(ft) == 0 {
		return ErrInvalidFileType
	}

	format := strings.ToLower(ft[0])

	switch format {
	case "png":
		img, err = png.Decode(body)
	case "jpg", "jpeg":
		img, err = jpeg.Decode(body)
	default:
		return ErrInvalidFileType
	}

	if err != nil {
		return err
	}

	resizedImg := resize.Resize(200, 0, img, resize.Lanczos3)
	imgReader, err := utility.ImageToReader(resizedImg, format)
	if err != nil {
		return err
	}

	return utility.storage.Save(path, imgReader)
}

func (utility *ImageUtility) ImageToReader(img image.Image, format string) (io.Reader, error) {
	buf := bufferPool.Get().(*bytes.Buffer)
	buf.Reset()

	var err error
	switch format {
	case "png":
		err = png.Encode(buf, img)
	case "jpg", "jpeg":
		err = jpeg.Encode(buf, img, &jpeg.Options{Quality: 60})
	default:
		err = png.Encode(buf, img)
	}

	if err != nil {
		bufferPool.Put(buf)
		return nil, err
	}

	return buf, nil
}

func (utility *ImageUtility) Remove(path string) error {
	return utility.storage.Remove(path)
}
