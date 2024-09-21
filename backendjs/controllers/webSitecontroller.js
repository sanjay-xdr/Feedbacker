const uploadFileToBlob = require("../azure/blob");
exports.hostSite = async (req, res) => {
  try {
    const htmlContent = await new Promise((resolve, reject) => {
      res.render("template", req.body, (err, html) => {
        if (err) {
          return reject(new Error("Error rendering template: " + err.message));
        }
        resolve(html);
      });
    });
    const containerName = "username";
    const blobName = req.body.blobName;
    const blobUrl = await uploadFileToBlob(containerName, blobName, htmlContent)
      .then((response) => response)
      .catch((error) => {
        console.error("Error uploading to blob:", error);
        throw error;
      });
    console.log(blobUrl, "URL HAI YE");
    res.json({
      message: "Template uploaded successfully",
      url: blobUrl,
    });
    //! You can add a database entry here if required
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred", error);
  }
};
