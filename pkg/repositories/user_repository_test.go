package repositories

import (
	"context"
	"testing"

	"github.com/karnerfly/pretkotha/pkg/db"
	"github.com/karnerfly/pretkotha/pkg/models"
	_ "github.com/lib/pq"
)

func TestGetUserById(t *testing.T) {
	db, err := db.New("postgres://postgres:ajay9339@127.0.0.1:5432/pretkotha?sslmode=disable")
	if err != nil {
		t.Fatal(err)
	}
	ur := NewUserRepo(db.Client())

	user, err := ur.GetUserById(context.TODO(), "ecadc402-50ed-4f65-9d7c-86da9a67aa57")
	if err != nil {
		t.Fatal(err)
	}

	t.Logf("USER; %+v\n", user)
}

func TestExistsByEmail(t *testing.T) {
	db, err := db.New("postgres://postgres:ajay9339@127.0.0.1:5432/pretkotha?sslmode=disable")
	if err != nil {
		t.Fatal(err)
	}
	ur := NewUserRepo(db.Client())

	ok, err := ur.ExistsByEmail(context.TODO(), "jane@example.com")
	if err != nil {
		t.Fatal(err)
	}

	t.Logf("FOUND: %v", ok)
}

func TestCreateUser(t *testing.T) {
	db, err := db.New("postgres://postgres:ajay9339@127.0.0.1:5432/pretkotha?sslmode=disable")
	if err != nil {
		t.Fatal(err)
	}
	ur := NewUserRepo(db.Client())

	user := &models.CreateUserPayload{
		UserName:  "testing",
		Email:     "testing@testing.com",
		Hash:      "hash123",
		AvatarUrl: "avatar.png",
		Bio:       "testing bio test",
		Phone:     "0000000000",
	}

	id, err := ur.CreateUser(context.TODO(), user)
	if err != nil {
		t.Fatal(err)
	}

	t.Logf("USER_ID: %s", id)
}
