package store

import (
	"bytes"
	"os"
	"testing"
)

func TestSave(t *testing.T) {
	data, err := os.ReadFile("/home/karnerfly/codes/go_projects/pretkotha-web/test/image/demo_avatar.jpg")
	if err != nil {
		t.Fail()
	}

	store := NewLocalStorage("../../../test/image/store_upload_test", 5242880)

	err = store.Save("test_avatar.jpg", bytes.NewReader(data))
	if err != nil {
		t.Error(err)
	}
}

func TestRemove(t *testing.T) {
	store := NewLocalStorage("../../../test/image/store_upload_test", 5242880)

	err := store.Remove("test_avatar.jpg")
	if err != nil {
		t.Error(err)
	}
}
