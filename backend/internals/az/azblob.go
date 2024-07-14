package az

import (
	"context"
	"fmt"
	"io"
	"log"
	"strings"

	"github.com/Azure/azure-sdk-for-go/sdk/azcore/to"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob/blob"
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
	azureCred := SettingUpAzure("name", "key")
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

func Settingup(formName string, content string) {

	accountName := "key"

	accountKey := "Value"

	cred, err := azblob.NewSharedKeyCredential(accountName, accountKey)
	handleError(err)

	client, err := azblob.NewClientWithSharedKeyCredential(fmt.Sprintf("https://%s.blob.core.windows.net/", accountName), cred, nil)
	handleError(err)

	containerName := "testcontainer4"

	// TODO:this creates container
	// containerCreateResp, err := client.CreateContainer(context.TODO(), containerName, &azblob.CreateContainerOptions{Access: to.Ptr(azblob.PublicAccessTypeBlob)})
	// handleError(err)
	// fmt.Println(containerCreateResp)

	//this uploads the blob
	blobData := content
	blobName := formName
	uploadResp, err := client.UploadStream(context.TODO(),
		containerName,
		blobName,
		strings.NewReader(blobData),
		&azblob.UploadStreamOptions{
			Metadata: map[string]*string{"Foo": to.Ptr("Bar")},
			Tags:     map[string]string{"Year": "2022"},
			HTTPHeaders: &blob.HTTPHeaders{
				BlobContentType: to.Ptr("text/html; charset=utf-8"),
			},
		})
	handleError(err)
	fmt.Print("SUccessfully Submitted")
	fmt.Println(uploadResp)

}
