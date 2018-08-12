const express = require('express');
const {User} = require('../models/user');
const {Shop} = require('../models/shop');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

// Dummy GET shops function
router.get('/shops', checkAuth, (req, res) => {
  Shop.find().then( shops => {
    res.status(200).json({
      message: 'Success!',
      shops: shops
    })
  })
})

// Liking a shop POST
router.post('/like/:id', checkAuth, (req,res) => {
  if(ObjectId.isValid(req.params.id)) {
    User.findById(req.userData.userId).then( (user) => {
      user.preference.liked.push(req.params.id);
      user.save().then( (doc)=> {
        res.status(200).json({
        message: 'Success!'
        });
    }, (e) => {
        res.status(400).send(e);
        console.log('Cannot update user content.')
    })
 }, (e) => {
        res.status(404).send(e);
        console.log('User not found.');
    })
} else {
  res.status(401).send();
  console.log('Invalid ID!');
}
})

module.exports = router;
