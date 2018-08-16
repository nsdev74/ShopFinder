const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const userOperations = require('../controllers/user-ops')




// Nearby shops GET
router.get('/shops/:lat/:lng', checkAuth, userOperations.nearby);

// Preferred shops GET
router.get('/liked', checkAuth, userOperations.preferred);

// Liking a shop POST
router.post('/like/:id', checkAuth, userOperations.like);

// Remove liked shop DELETE
router.delete('/like/:id', checkAuth, userOperations.removeLike);

// Dislike Shops PUT
router.patch('/dislike/:id', checkAuth, userOperations.dislike);

module.exports = router;
