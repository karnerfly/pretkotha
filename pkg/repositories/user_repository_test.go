package repositories

import (
	"context"
	"testing"

	"github.com/karnerfly/pretkotha/pkg/db"
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

	ok, err := ur.ExistsByEmail(context.TODO(), "jan@example.com")
	if err != nil {
		t.Fatal(err)
	}

	t.Logf("FOUND: %v", ok)
}
