package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/sanjay-xdr/feedbacker/internals/driver"
	"github.com/sanjay-xdr/feedbacker/internals/handlers"
)

func main() {

	mux := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	mux.Use(cors.Handler)

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

	mux.Get("/home", handlers.Repo.Home)

	mux.Post("/hostsite", handlers.HostSite)

	mux.Get("/viewpage/{id}", handlers.ViewPage)
	mux.Post("/feedback", handlers.CreateFeedback)

	log.Fatal(http.ListenAndServe(":8080", mux))

}
