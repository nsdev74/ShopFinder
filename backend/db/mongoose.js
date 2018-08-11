var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Local MongoDB connection
mongoose.connect('mongodb://localhost:27017/RESTPractice', { useNewUrlParser: true })
.then( () => {
  console.log("Connected to database!");
})
.catch( () => {
  console.log("Connection failed.");
});

module.exports = {mongoose}
