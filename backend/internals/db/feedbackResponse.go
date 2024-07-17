package db

import (
	"context"
	"fmt"
	"log"

	"github.com/sanjay-xdr/feedbacker/internals/models"
)

func (m *PostgresDbCon) InsertIntoMOngoDb(feedbackResponse models.FeedbackResponse) {

	collection := m.MongoDb.Database("feedbacker").Collection("Sanjay_lkjadsfho87kjasdfoi")

	// Insert one document
	insertResult, err := collection.InsertOne(context.Background(), feedbackResponse)
	if err != nil {
		fmt.Print("Bhai Data Enter nhi ho rha hai ")
		log.Fatal(err)
	}
	fmt.Println("Inserted document ID:", insertResult.InsertedID)
}
