package repositories

import (
	"context"
	"testing"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/enum"
)

func TestGetLatestPosts(t *testing.T) {
	db, err := db.New("postgres://postgres:ajay9339@127.0.0.1:5432/pretkotha?sslmode=disable")
	if err != nil {
		t.Fatal(err)
	}

	pr := NewPostRepo(db.Client())

	posts, err := pr.GetLatestPosts(context.TODO(), 2)
	if err != nil {
		t.Fatal(err)
	}

	for _, post := range posts {
		t.Logf("POSTS: %+v\n", post)
	}
}

func TestGetPosts(t *testing.T) {
	db, err := db.New("postgres://postgres:ajay9339@127.0.0.1:5432/pretkotha?sslmode=disable")
	if err != nil {
		t.Fatal(err)
	}

	pr := NewPostRepo(db.Client())

	posts, err := pr.GetPosts(context.TODO(), enum.PostFilterOldest, 1, 2)
	if err != nil {
		t.Fatal(err)
	}

	for _, post := range posts {
		t.Logf("POSTS: %+v\n", post)
	}
}
