const jwt = require('jsonwebtoken');
// Must outsource the secret to its own file that can be accessed by the middleware and users.js route later
const secret = 'secret_text_that_is_obviously_not_complicated_or_secure_enough';

// Auth middleware
module.exports = (req, res, next) => {
  // Reaed the header after the Bearer keyword by splitting the string from the white space
  try {
    const token = req.headers.authorization.split(" ")[1];
    // Throws an error if it fails, or proceed with next() if it succeeds
    const decodedToken  = jwt.verify(token, secret);
    req.userData = {email: decodedToken.email, userId: decodedToken.userId}
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed!'});
  }
}
