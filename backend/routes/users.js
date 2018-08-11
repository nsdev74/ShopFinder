const express = require('express');
const bcrypt = require("bcrypt");

const {User} = require('../models/user');

const router = express.Router();

// User sign up POST
router.post("/signup", (req,res,next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      let user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(results => {
          res.status(201).json({
            message: 'Success!',
            result: results
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })
})

module.exports = router;
