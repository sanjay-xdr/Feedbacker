const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/webSitecontroller');

// Define routes for users
router.post('/hostsite', websiteController.hostSite);


module.exports = router;