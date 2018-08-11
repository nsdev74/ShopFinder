const express = require('express');
const {User} = require('../models/user');

const router = express.Router();

// Dummy call
router.use( (req,res, next) => {
  console.log('Hello world!');
  res.send('Hello world from express!');
})

module.exports = router;
