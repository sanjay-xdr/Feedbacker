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
	if err != nil {
		fmt.Print("Something went wrong while connecting to the  SQL database", err)
	}

	mongoDb, err := driver.ConnectMongoDB("get string")

	if err != nil {
		fmt.Print("Something went wrong while connecting to the MONGO database", err)
	}
	r := handlers.NewRepo(db, mongoDb)
	handlers.NewHandlers(r)

	defer db.Close()

	mux := Routes()

	log.Fatal(http.ListenAndServe(":8080", mux))

}
