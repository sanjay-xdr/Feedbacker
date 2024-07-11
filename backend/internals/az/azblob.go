package az

import (
	"context"
	"fmt"
	"io"
	"log"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
)

func handleError(err error) {
	if err != nil {
		log.Fatal(err.Error())
	}
}

type AzureCredential struct {
	AccountName string
	AccountKey  string
}

func SettingUpAzure(name, key string) *AzureCredential {

	return &AzureCredential{
		AccountName: name,
		AccountKey:  key,
	}

}

func ConnectToAzure() {
	azureCred := SettingUpAzure("feedbackerstore", "saV7Tihvy/iGBi2UwqN9uEA27swp0hAGW+PQcqEy4hJmlU5rVYr+jcwjWESfIjin5QihjfxXlm/y+AStLotG8A==")
	cred, err := azblob.NewSharedKeyCredential(azureCred.AccountName, azureCred.AccountKey)

	handleError(err)

	client, err := azblob.NewClientWithSharedKeyCredential(fmt.Sprintf("https://%s.blob.core.windows.net/", azureCred.AccountName), cred, nil)
	handleError(err)
	containerName := "userdata"
	blobName := "demo.html"
	blobDownloadResponse, err := client.DownloadStream(context.TODO(), containerName, blobName, nil)
	handleError(err)

	reader := blobDownloadResponse.Body
	downloadData, err := io.ReadAll(reader)
	handleError(err)
	fmt.Print(downloadData, " Final Response ")

}
