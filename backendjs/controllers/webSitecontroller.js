// get the frontend data from the user 
// make the HTML page 
// upload that page into the Azure Blob storage

exports.hostSite=(req,res)=>{
    console.log(req.body);
    // res.send("hit succesful");
    res.render('template', req.body);
}