package main

import (
	"net/http"

	"github.com/CloudyKit/jet/v6"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

var views = jet.NewSet(
	jet.NewOSFileSystemLoader("./html"),
	jet.InDevelopmentMode(), // remove in production
)

func main() {

	mux := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allows all origins
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})

	mux.Use(cors.Handler)

	mux.Get("/home", Home)


	//here I am creating the feedback website based on admin's customization
	mux.Post("/hostsite", HostSite)


	//user can see his generated pages by this endpoint
	mux.Get("/viewpage/{id}", ViewPage)
	mux.Post("/feedback", CreateFeedback)


	http.ListenAndServe(":8080", mux)

}
