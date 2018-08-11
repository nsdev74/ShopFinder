const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {User} = require('../models/user');
const secret = 'secret_text_that_is_obviously_not_complicated_or_secure_enough';

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

// User sign in POST
router.post("/signin", (req,res,next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then( user => {
    // If user is not found, authentication fails
    if (!user) {
      return res.status(401);
    } else {
      fetchedUser = user;
    }
    // Return hashed password comparison for .then call
    return bcrypt.compare(req.body.password, fetchedUser.password);
  })
    .then(result => {
      if (!result) {
        // If newly hashed password doesn't equal stored hashed password, authentication fails
        return res.status(401);
      } else {
        let token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, secret, { expiresIn: '2h'});
        res.statusCode(200).json({
          token: token
        })
      }
    })
    .catch(err => {
      // If other error, authentication fails
      return res.status(401);
      console.log(err);
    })
})

module.exports = router;
