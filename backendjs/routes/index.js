const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const webRoutes=require('./webSiteRoutes')


router.use('/users', userRoutes);
router.use("/web", webRoutes)


module.exports = router;
