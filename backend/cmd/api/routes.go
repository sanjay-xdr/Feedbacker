package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/sanjay-xdr/feedbacker/internals/handlers"
)

func Routes() http.Handler {

	mux := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	mux.Use(cors.Handler)

	mux.Get("/home", handlers.Repo.Home)

	mux.Post("/hostsite", handlers.Repo.HostSite)

	// mux.Get("/viewpage/{id}", handlers.ViewPage)
	mux.Post("/feedback", handlers.Repo.CreateFeedback)

	return mux

}
