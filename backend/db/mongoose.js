//Global dependencies
var mongoose = require('mongoose');
const fs = require('fs')
// Local dependencies
const DBUrl = JSON.parse(fs.readFileSync(__dirname +'/../config.json', 'UTF-8')).DBUrl;

mongoose.Promise = global.Promise;

// Local MongoDB connection
mongoose.connect(DBUrl, { useNewUrlParser: true })
.then( () => {
  console.log("Connected to database!");
})
.catch( () => {
  console.log("Connection failed.");
});

module.exports = {mongoose}
