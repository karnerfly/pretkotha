package session

import (
	"context"
	"testing"
)

func TestSerialize(t *testing.T) {
	s, err := New("redis://localhost:6379/0?protocol=3")
	if err != nil {
		t.Fatal(err)
	}

	err = s.Serialize(context.TODO(), "hello", "world", 60)
	if err != nil {
		t.Error(err)
	}
}

func TestDeSerialize(t *testing.T) {
	s, err := New("redis://localhost:6379/0?protocol=3")
	if err != nil {
		t.Fatal(err)
	}

	var value string
	err = s.DeSerialize(context.TODO(), "hello", &value)
	if err != nil {
		t.Fatal(err)
	}

	if value != "world" {
		t.Error("invalid value")
	}
}

func TestUpdate(t *testing.T) {
	s, err := New("redis://localhost:6379/0?protocol=3")
	if err != nil {
		t.Fatal(err)
	}

	err = s.Update(context.TODO(), "hello", "world2")
	if err != nil {
		t.Fatal(err)
	}

	var value string
	err = s.DeSerialize(context.TODO(), "hello", &value)
	if err != nil {
		t.Fatal(err)
	}

	if value != "world2" {
		t.Error("invalid value")
	}
}

func TestRemove(t *testing.T) {
	s, err := New("redis://localhost:6379/0?protocol=3")
	if err != nil {
		t.Fatal(err)
	}

	err = s.Remove(context.TODO(), "hello")
	if err != nil {
		t.Error(err)
	}
}
