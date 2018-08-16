const express = require('express');

const UserController = require('../controllers/users');

const router = express.Router();

// User sign up POST
router.post("/signup", UserController.signUp);

// User sign in POST
router.post("/signin", UserController.signIn);

module.exports = router;
