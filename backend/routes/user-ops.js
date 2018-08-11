const express = require('express');
const {User} = require('../models/user');
const {Shop} = require('../models/shop');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// Dummy GET shops function
router.get('/shops', checkAuth, (req, res) => {
  Shop.find().then( shops => {
    res.status(200).json({
      message: 'Success!',
      shops: shops
    })
  })
})


module.exports = router;
