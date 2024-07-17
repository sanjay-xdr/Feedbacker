package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/CloudyKit/jet/v6"
	"github.com/sanjay-xdr/feedbacker/internals/az"
	"github.com/sanjay-xdr/feedbacker/internals/db"
	"github.com/sanjay-xdr/feedbacker/internals/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type RequestBody struct {
	Heading       string `json:"heading"`
	Description   string `json:"description"`
	Footer        string `json:"footer"`
	BlobName      string `json:"blobName"`
	FormName      string `json:"formName"`
	ShowEmailBox  bool   `json:"showEmailBox"`
	ShowRatingBox bool   `json:"showRatingBox"`
}

type FeedbackResponse struct {
	Feedback string `json:"feedback"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Rating   int    `json:"rating"`
}

var views = jet.NewSet(
	jet.NewOSFileSystemLoader("./template"),
	jet.InDevelopmentMode(),
)

type Repositry struct {
	DbCon *db.PostgresDbCon
}

var Repo *Repositry

func NewRepo(dbc *sql.DB, mongoDbc *mongo.Client) *Repositry {

	if dbc == nil {
		log.Print("DBC is null")
	}
	return &Repositry{

		DbCon: db.NewPostgresRepo(dbc, mongoDbc),
	}
}

// set the Above Repo Variable
func NewHandlers(r *Repositry) {

	if r == nil {
		log.Fatal("Bhai R NIL hai")
	}
	fmt.Print(r)
	Repo = r
}

func (m *Repositry) Home(w http.ResponseWriter, r *http.Request) {

	fmt.Print("Hello WOrld")
}

func (m *Repositry) HostSite(w http.ResponseWriter, r *http.Request) {

	if m == nil {
		fmt.Print(m)
		fmt.Println()
		log.Fatal("Repo is Nil")
		return
	}

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
	fmt.Println()

	// fmt.Print(userData.BlobName, "FormID is this")
	fmt.Println()
	link, err := az.Settingup(userData.BlobName, content)
	if err != nil {
		log.Fatal("Something went wrong while Uploading to AZURe ", err)
	}

	formData := &models.Form{
		FormName:  userData.FormName,
		FormLink:  link,
		UserId:    1,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	err = m.DbCon.InsertIntoForm(*formData)

	if err != nil {
		log.Fatal("Something Went Wrong While Inserting into DB ", err)
	}

	// response := map[string]string{"pageURL": pageURL}
	// w.Header().Set("Content-Type", "application/json")
	// json.NewEncoder(w).Encode(response)

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

func (m *Repositry) CreateFeedback(w http.ResponseWriter, r *http.Request) {
	fmt.Println()
	fmt.Print("Creating the Feedback Now ")

	fmt.Println()

	var userFeedbackResponse FeedbackResponse

	err := json.NewDecoder(r.Body).Decode(&userFeedbackResponse)

	if err != nil {
		fmt.Print(err)
	}

	data := models.FeedbackResponse{
		Feedback:  userFeedbackResponse.Feedback,
		Name:      userFeedbackResponse.Name,
		Email:     userFeedbackResponse.Email,
		Rating:    userFeedbackResponse.Rating,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	m.DbCon.InsertIntoMOngoDb(data)

	if err != nil {
		fmt.Print("Error While Reading the Body")
	}

	// fmt.Print(string(body))

}
