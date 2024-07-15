package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/sanjay-xdr/feedbacker/internals/models"
)

// ? Inserting into Database
func (m *PostgresDbCon) InsertIntoForm(formdata models.Form) error {

	fmt.Println(" Adding Data into the Form")
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	stmt := `insert into "Form" ("formName", "formLink", "userId", "created_at","updated_at") values ($1,$2,$3,$4,$5) `

	_, err := m.DB.ExecContext(ctx, stmt, formdata.FormName, formdata.FormLink, formdata.UserId, formdata.CreatedAt, formdata.UpdatedAt)

	if err != nil {
		log.Fatal("Something went wrong while Inserting into the Form table ", err)
		return err
	}

	return nil

}

func (m *PostgresDbCon) GetDataFromFormById() error {

	return nil

}

// ! Name of the generated form is going to be unique
func (m *PostgresDbCon) GetDataFromFormByFormName() error {
	return nil
}
