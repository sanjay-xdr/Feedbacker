// get the frontend data from the user 
// make the HTML page 
// upload that page into the Azure Blob storage
const uploadFileToBlob = require('../azure/blob');
const { getPgVersion } = require('../db/config/index');
exports.hostSite=(req,res)=>{
    console.log(req.body);
    // res.send("hit succesful");

    //! UPLOAD TO BLOB STORAGE

    //! MAKE AND ENTRY INTO THE DATABASE

    const htmlContent = "<html><body>Hello, World!</body></html>";
    uploadFileToBlob("htmlpages", "example.html", htmlContent)
      .then(() => console.log("Upload successful"))
      .catch((error) => console.error("Error uploading to blob:", error));
    // res.render('template', req.body);

}


//!Code for azure work 
/*
const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid"); // For generating unique file names
const path = require("path");

// Azure Storage account connection string
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING; // Store this in your .env file

// Initialize the BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

exports.hostSite = async (req, res) => {
  try {
    // Render the template to a string
    const htmlContent = await res.render("template", req.body, (err, html) => {
      if (err) {
        throw new Error("Error rendering template: " + err.message);
      }
      return html;
    });

    // Define the container and file name
    const containerName = "your-container-name"; // Change this to your container name
    const blobName = `template-${uuidv4()}.html`;

    // Get the container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Upload the HTML file to Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(htmlContent, Buffer.byteLength(htmlContent));

    // Generate the URL for the uploaded file
    const fileUrl = blockBlobClient.url;

    // Send the URL in the response
    res.json({
      message: "Template uploaded successfully",
      url: fileUrl,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
};

*/
