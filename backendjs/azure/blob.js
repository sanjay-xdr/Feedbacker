const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error(
    "Azure Storage Connection String is not defined in the environment variables."
  );
}

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);

const createContainer = async (containerName) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();
  console.log(`Container '${containerName}' created or already exists.`);
  await containerClient.setAccessPolicy("blob");
  console.log(
    `Access level for container '${containerName}' set to 'container' (public read access).`
  );
}
async function uploadFileToBlob(containerName, blobName, content) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await createContainer(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadOptions = {
      blobHTTPHeaders: {
        blobContentType: "text/html",
      },
    };

    await blockBlobClient.upload(
      content,
      Buffer.byteLength(content),
      uploadOptions
    );
    console.log(`File uploaded to Blob: ${blobName}`);
    const blobUrl = blockBlobClient.url;
    console.log("Blob URL:", blobUrl);
    return blobUrl;
  } catch (error) {
    console.error("Error uploading to blob:", error.message);
    throw error;
  }
}

module.exports = uploadFileToBlob;
