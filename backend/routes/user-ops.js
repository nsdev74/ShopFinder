const express = require('express');
const {User} = require('../models/user');
const {Shop} = require('../models/shop');

const router = express.Router();

// Dummy GET shops function
router.get('/shops', (req, res) => {
  Shop.find().then( shops => {
    res.send(shops);
  })
})


module.exports = router;
