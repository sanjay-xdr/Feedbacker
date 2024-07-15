package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/sanjay-xdr/feedbacker/internals/driver"
	"github.com/sanjay-xdr/feedbacker/internals/handlers"
)

/*
* * These
TODO: afdasljfkadsfda
! something
? wowoowwoowow
*/
func main() {

	mux := Routes()

	//   az.ConnectToAzure();

	// az.Settingup()
	//THis is the cal
	db, err := driver.ConnectDb("host=localhost port=5432 dbname=Feedbacker user=postgres password=sanjay")
	r := handlers.NewRepo(db)
	handlers.NewHandlers(r)

	if err != nil {
		fmt.Print("Something went wrong while connecting to the database", err)
	}
	defer func() {
		if err := db.Close(); err != nil {
			log.Printf("Error closing the database connection: %v", err)
		}
	}()

	log.Fatal(http.ListenAndServe(":8080", mux))

}
