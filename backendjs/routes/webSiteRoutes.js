const express = require('express');
const router = express.Router();

// Example web route
router.get('/', (req, res) => {
  res.status(200).send('Welcome to the web route!');
});

module.exports = router;
