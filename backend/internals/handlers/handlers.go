package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/CloudyKit/jet/v6"
)

type RequestBody struct {
	Heading     string `json:"heading"`
	Description string `json:"description"`
	Footer      string `json:"footer"`
}

var views = jet.NewSet(
	jet.NewOSFileSystemLoader("./template"),
	jet.InDevelopmentMode(),
)

func Home(w http.ResponseWriter, r *http.Request) {

	fmt.Print("Hello WOrld")
}

func HostSite(w http.ResponseWriter, r *http.Request) {

	var userData RequestBody

	err := json.NewDecoder(r.Body).Decode(&userData)

	if err != nil {
		log.Fatal("Something went wrong while parsing json ")
	}

	// fmt.Printf("Heading: %s\n", userData.Heading)
	// fmt.Printf("Description: %s\n", userData.Description)
	// fmt.Printf("Footer: %s\n", userData.Footer)

	pageID := createNewPage(userData)

	baseURL := "http://" + r.Host
	pageURL := fmt.Sprintf("%s/viewpage/%d", baseURL, pageID)
	response := map[string]string{"pageURL": pageURL}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)

	// renderPage(w, "home.jet", nil)

}

func createNewPage(userData RequestBody) int {
	// Simulate creating a new page and return a unique page ID
	// In a real scenario, you might create an HTML file or store page data in a database
	pageID := generateUniquePageID()
	createHTMLPage(pageID, userData)
	return pageID
}

func generateUniquePageID() int {
	// Simulate generating a unique page ID
	// In a real scenario, you might use a database auto-increment field or UUID
	return os.Getpid() // For demonstration, use process ID as a unique ID
}

// func createHTMLPage(pageID int, userData RequestBody) {
// 	// Simulate creating an HTML page with user data
// 	// In a real scenario, you would generate or render an HTML file
// 	tmpl, err := template.New("page").Parse(`<html>
//     <head>
//         <title>{{.Heading}}</title>
//     </head>
//     <body>
//         <h1>{{.Heading}}</h1>
//         <p>{{.Description}}</p>
//         <footer>{{.Footer}}</footer>
//     </body>
//     </html>`)

// 	if err != nil {
// 		log.Fatalf("Error parsing template: %v", err)
// 	}

// 	fileName := fmt.Sprintf("page_%d.html", pageID)
// 	file, err := os.Create(fileName)
// 	if err != nil {
// 		log.Fatalf("Error creating file: %v", err)
// 	}
// 	defer file.Close()

// 	err = tmpl.Execute(file, userData)
// 	if err != nil {
// 		log.Fatalf("Error executing template: %v", err)
// 	}

// 	fmt.Printf("Created new page: %s\n", fileName)
// }

func createHTMLPage(pageID int, userData RequestBody) {
	// fmt.Print(userData.Heading)
	tmpl, err := views.GetTemplate("home.jet")
	// fmt.Print(tmpl)
	if err != nil {
		log.Fatalf("Error getting template: %v", err)
	}

	fileName := fmt.Sprintf("page_%d.html", pageID)
	file, err := os.Create(fileName)
	if err != nil {
		log.Fatalf("Error creating file: %v", err)
	}
	defer file.Close()

	vars := make(jet.VarMap)
	vars.Set("userData", userData)

	err = tmpl.Execute(file, vars, nil)
	if err != nil {
		log.Fatalf("Error executing template: %v", err)
	}

	fmt.Printf("Created new page: %s\n", fileName)
}
func renderPage(w http.ResponseWriter, html string, data jet.VarMap) error {

	view, err := views.GetTemplate(html)
	if err != nil {
		log.Fatal("Something wrong while rendering", err)
		return err
	}

	err = view.Execute(w, data, nil)
	if err != nil {
		log.Fatal("Something went wrong while executing the page")
		return err
	}
	return nil
}

func ViewPage(w http.ResponseWriter, r *http.Request) {

	fmt.Print("This is my viewPage")
	// Extract the page ID from the URL path
	pageIDStr := r.URL.Path[len("/viewpage/"):]
	pageID, err := strconv.Atoi(pageIDStr)
	if err != nil {
		http.Error(w, "Invalid page ID", http.StatusBadRequest)
		return
	}

	// Serve the corresponding HTML page
	fileName := fmt.Sprintf("page_%d.html", pageID)
	http.ServeFile(w, r, fileName)
}

func CreateFeedback(w http.ResponseWriter, r *http.Request) {

	fmt.Print("Creating the Feedback Now")
	fmt.Println()

	body, err := io.ReadAll(r.Body)

	if err != nil {
		fmt.Print("Error While Reading the Body")
	}

	fmt.Print(string(body))

}
