package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/sanjay-xdr/feedbacker/internals/az"
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

  az.ConnectToAzure();

	mux.Get("/home", handlers.Home)

	mux.Post("/hostsite", handlers.HostSite)

	mux.Get("/viewpage/{id}", handlers.ViewPage)
	mux.Post("/feedback", handlers.CreateFeedback)

	http.ListenAndServe(":8080", mux)

}
