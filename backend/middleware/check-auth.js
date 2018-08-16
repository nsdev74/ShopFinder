// Global dependencies
const jwt = require('jsonwebtoken');
const fs = require('fs')
// Local dependencies
const secret = JSON.parse(fs.readFileSync(__dirname +'/../config.json', 'UTF-8')).secret;

// Auth middleware
module.exports = (req, res, next) => {
  // Reaed the header after the 'Bearer ' keyword by splitting the string from the white space
  try {
    const token = req.headers.authorization.split(" ")[1];
    // Throws an error if it fails, or proceed with next() if it succeeds
    const decodedToken  = jwt.verify(token, secret);
    // Setting user data for req operations, email not currently used for anything
    req.userData = {email: decodedToken.email, userId: decodedToken.userId}
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!'});
  }
}
