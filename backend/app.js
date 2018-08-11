const express = require('express');
// Local dependencies
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');

// Routes
const usersRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allowing cross origin access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Credentials", "true"
  );
  next();
});


// Dummy call
app.use( (req,res, next) => {
    console.log('Hello world!');
    res.send('Hello world from express!');
})

module.exports = app;
