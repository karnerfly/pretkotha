package utils

import (
	"bytes"
	"os"
	"testing"

	"github.com/karnerfly/pretkotha/pkg/utils/store"
)

func TestResizeAndSave(t *testing.T) {
	store := store.NewLocalStorage("../../test/image", 5242880)
	utility := NewImageUtility(store)

	data, err := os.ReadFile("/home/karnerfly/codes/go_projects/pretkotha-web/test/image/demo_avatar.jpg")
	if err != nil {
		t.Fatal(err)
	}

	err = utility.ResizeAndSave("compressed/e.png", bytes.NewReader(data))
	if err != nil {
		t.Error(err)
	}
}
