// Global dependencies
const express = require('express');
var bodyParser = require('body-parser');
// Local dependencies
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');

// Routes
const usersRoutes = require('./routes/users');
const userOpsRoutes = require('./routes/user-ops');

const app = express();

// Body parser settings
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



// Routes
app.use("/api/users", usersRoutes);
app.use("/api/user-operations/", userOpsRoutes);

module.exports = app;
