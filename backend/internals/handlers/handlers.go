package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/CloudyKit/jet/v6"
)

type RequestBody struct {
	Heading       string `json:"heading"`
	Description   string `json:"description"`
	Footer        string `json:"footer"`
	FormName      string `json:"formName"`
	ShowEmailBox  bool   `json:"showEmailBox"`
	ShowRatingBox bool   `json:"showRatingBox"`
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

	defer r.Body.Close()

	fmt.Print(userData)

	if err != nil {
		log.Fatal("Something went wrong while parsing json ")
	}

	content, err := renderPage("home.jet", userData)
	if err != nil {
		log.Fatal("Something went wrong while parsing json ")
	}
	fmt.Print(content)
	// az.Settingup(userData.FormName, content)

	//UserData have all the data
	// first store the content into the blob
	// get the link from the blob
	//https://feedbackerstore.blob.core.windows.net/testcontainer4/FormNamefromuserData
	// store into DB
	// pageID := createNewPage(userData)

	// baseURL := "http://" + r.Host
	// pageURL := fmt.Sprintf("%s/viewpage/%d", baseURL, pageID)
	// response := map[string]string{"pageURL": pageURL}
	// w.Header().Set("Content-Type", "application/json")
	// json.NewEncoder(w).Encode(response)

}

func createNewPage(userData RequestBody) int {

	pageID := generateUniquePageID()
	createHTMLPage(pageID, userData)
	return pageID
}

func generateUniquePageID() int {

	return os.Getpid()
}

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
func renderPage(html string, data RequestBody) (string, error) {

	view, err := views.GetTemplate(html)
	if err != nil {
		log.Fatal("Something wrong while rendering", err)
		return "", err
	}
	vars := make(jet.VarMap)
	vars.Set("Heading", data.Heading)
	vars.Set("Description", data.Description)
	vars.Set("Footer", data.Footer)
	vars.Set("FormName", data.FormName)
	vars.Set("ShowEmailBox", data.ShowEmailBox)
	vars.Set("ShowRatingBox", data.ShowRatingBox)
	var buf strings.Builder
	err = view.Execute(&buf, vars, nil)
	// fmt.Print("Print Data Now")
	// fmt.Println()
	// fmt.Print(buf.String())
	if err != nil {
		log.Fatal("Something went wrong while executing the page ", err)
		return "", err
	}
	// fmt.Print("Print Data Now")
	// fmt.Println()
	// fmt.Print(buf.String())

	return buf.String(), nil
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
