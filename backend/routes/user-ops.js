const express = require('express');
const distance = require('geo-distance');

const {User} = require('../models/user');
const {Shop} = require('../models/shop');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

// Nearby shops get
router.get('/shops/:lat/:lng', checkAuth, (req,res) => {
  User.findById(req.userData.userId).then( (user) => {
      // Fetching shops that aren't liked
      Shop.find( {
          // Making sure preferred shops are excluded
          _id: { $nin:
              user.preference.liked}}
      ).then( (shops) => {
          // Fetching user geolocation from query params
          let source = {
              lat: req.params.lat,
              lng: req.params.lng
          };
          // Calculating distance for each shop element
          for (let i=0; i<shops.length; i++) {
              let destination = {
                  lat: shops[i].location.coordinates[1],
                  lng: shops[i].location.coordinates[0]
              };
              shops[i].distance=distance.between(source, destination);
              // Hiding shop location
              shops[i].location='hidden';
          }
          // Shorting the shop based on distance, closest before furthest
          shops.sort( function(a,b) {
              return a.distance.radians-b.distance.radians;
          })
          res.status(200).json({
            message: 'Success!',
            shops: shops
          })
      }, (e) => {
        res.status(404).send(e);
        console.log('Unable to fetch nearby shops.');
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
