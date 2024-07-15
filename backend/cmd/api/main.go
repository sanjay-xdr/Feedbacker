package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/sanjay-xdr/feedbacker/internals/driver"
	"github.com/sanjay-xdr/feedbacker/internals/handlers"
)

func main() {

	db, err := driver.ConnectDb("host=localhost port=5432 dbname=Feedbacker user=postgres password=sanjay")
	r := handlers.NewRepo(db)
	handlers.NewHandlers(r)

	if err != nil {
		fmt.Print("Something went wrong while connecting to the database", err)
	}

	defer db.Close()

	mux := Routes()

	log.Fatal(http.ListenAndServe(":8080", mux))

}
