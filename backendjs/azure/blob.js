const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage Connection String is not defined in the environment variables.");
}

console.log(AZURE_STORAGE_CONNECTION_STRING, "Value of connection string");

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Function to create a container if it doesn't exist
async function createContainer(containerName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.createIfNotExists();
  console.log(`Container '${containerName}' created, if it didn't exist.`);
}

// Example of uploading a file to blob storage
async function uploadFileToBlob(containerName, blobName, content) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  // Create the container if it doesn't exist
  await createContainer(containerName);
  
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.upload(content, content.length);
    console.log(`File uploaded to Blob: ${blobName}`);
  } catch (error) {
    console.error("Error uploading to blob:", error.message);
  }
}

module.exports = uploadFileToBlob;
