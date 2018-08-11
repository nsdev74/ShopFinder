const express = require('express');

const {mongoose} = require('./db/mongoose');

const app = express();

// Dummy call
app.use( (req,res, next) => {
    console.log('Hello world!');
    res.send('Hello world from express!');
})

module.exports = app;
