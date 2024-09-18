const express = require('express');
const router = express.Router();

// Example web route
router.get('/', (req, res) => {
  res.status(200).send('Welcome to the web route!');
});

router.post("/hostsite",(req,res)=>{

  // read body here

  return res.json({msg:"Hit Successful"})
})
module.exports = router;
