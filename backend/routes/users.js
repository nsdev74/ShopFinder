const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");

const {User} = require('../models/user');
// Must outsource the secret to its own file that can be accessed by the middleware and users.js route later
const secret = 'secret_text_that_is_obviously_not_complicated_or_secure_enough';

const router = express.Router();

// User sign up POST
router.post("/signup", (req,res,next) => {
  if ( req.body.password.length >= 6 && req.body.password.length <= 14
    && emailValidator.validate(req.body.email)) {
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
          console.log('Sign up attempt succeeded from ' + req.body.email);
        })
        .catch(err => {
          res.status(500).json({
            message: 'An error occured'
          });
          console.log('Sign up attempt failed from ' + req.body.email + ' ; ' + err);
        });
    })
  } else {
    console.log('Sign up with invalid email or password attempt from ' + req.body.email);
    return res.status(401).json({
      message: 'Invalid email or password!'
    })
  }
})

// User sign in POST
router.post("/signin", (req,res,next) => {
  let fetchedUser;
  const email = req.body.email;
  if (req.body.password.length >= 6 && req.body.password.length <= 14
    && emailValidator.validate(req.body.email)) {
  User.findOne({ email: req.body.email }).then( user => {
    // If user is not found, authentication fails
    if (!user) {
      throw new Error('User email not found.');
    } else {
      fetchedUser = user;
    // Return hashed password comparison for .then call
    return bcrypt.compare(req.body.password, fetchedUser.password);
    }
  })
    .then(result => {
      if (!result) {
        // If newly hashed password doesn't equal stored hashed password, authentication fails
        throw new Error('Incorrect password.');
      } else {
        let token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, secret, { expiresIn: '2h'});
        res.status(200).json({
          token: token,
          expiresIn: 7200
        })
        console.log('Sign in attempt succeeded, token ' + token + ' created by ' + email);
      }
    })
    .catch(err => {
      // If other error, authentication fails
      console.log('Sign in attempt failed from ' + email + ' ; ' + err);
      return res.status(401).json({
        message: 'An error occured'
      })
    })
  } else {
    console.log('Sign in with invalid email or password attempt from ' + email);
  }
})

module.exports = router;
