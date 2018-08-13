const express = require('express');
const distance = require('geo-distance');

const {User} = require('../models/user');
const {Shop} = require('../models/shop');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

// Nearby shops GET
router.get('/shops/:lat/:lng', checkAuth, (req,res) => {
  User.findById(req.userData.userId).then( (user) => {
      // Storing valid dislikde shops in temporary array
      let disliked = [];
       for (let i=0; i<user.preference.disliked.shop.length; i++) {
          if(user.preference.disliked.validUntil[i]>=Date.now()) {
          disliked.push(user.preference.disliked.shop[i]);
          }
      }
      // Fetching shops that aren't liked or disliked
      Shop.find( {
          _id: { $nin:
              disliked.concat(user.preference.liked)}}
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

// Preferred shops GET
router.get('/liked', checkAuth, (req,res) => {
  User.findById(req.userData.userId).then( (user) => {
      Shop.find( {
          _id: { $in:
              user.preference.liked }}
      ).then( (shops) => {
          res.status(200).json({
            shops: shops
          })
      })
  })
})

// Liking a shop POST
router.post('/like/:id', checkAuth, (req,res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.userData.userId).then( (user) => {
      // If no existing preferred shop with the same ID exists
      if (!user.preference.liked.includes(req.params.id)) {
      user.preference.liked.push(req.params.id);
      user.save().then( (doc)=> {
        res.status(200).json({
        message: 'Success!'
        });

    }, (e) => {
        res.status(400).send(e);
        console.log('Cannot update user content.')
    })
    } else {
      // 409 Conflict
      console.log('Shop already preferred!');
      res.status(409).json({
       message: 'Shop already preferred!'
      });
    }
    }, (e) => {
          res.status(404).send(e);
          console.log('User not found.');
    })
    } else {
      res.status(401).send();
      console.log('Invalid ID!');
  }
})

// Remove liked shop DELETE
router.delete('/like/:id', checkAuth, (req, res) => {
  if (ObjectId.isValid(req.params.id))
  {
      User.findById(req.userData.userId).then( (user) =>{
        // Confirming the existence of the desired liked shop
        if (user.preference.liked.includes(req.params.id)) {
          for(var i = user.preference.liked.length - 1; i >= 0; i--) {
              if (user.preference.liked[i] === req.params.id) {
                  user.preference.liked.splice(i, 1);
              }
          }
      user.save().then( (doc)=> {
          // Success call
          res.status(200).json({
          message: 'Success!'
          });
      }, (e) => {
          // Fail to remove liked shop
          res.status(400).send(e);
          console.log('Cannot update user content.')
      })
      } else {
        // 404 Resource not found
        console.log('Shop already preferred!');
        res.status(404).json({
        message: ' preferred!'
      });
      }
    }, (e) => {
          res.status(404).send(e);
          console.log('User not found.');
      })
  } else {console.log('Invalid ID!')}
})

// PUT User's Dislike Shops API
router.put('/dislike/:id', checkAuth, (req, res) => {
  if(ObjectId.isValid(req.params.id))
  {
      User.findById(req.userData.userId).then( (user) =>{
        // Check if shop doesn't exist in liked
        if (!user.preference.liked.includes(req.params.id)) {
          let date = new Date();
          date.setHours(date.getHours() + 2);
          // Check if shop doesn't exist in disliked
          if (!user.preference.disliked.shop.includes(req.params.id)) {
            user.preference.disliked.shop.push(req.params.id);
            user.preference.disliked.validUntil.push(date);
          } else {
            // Update ValidUntil if shop already exist in disliked
            for(var i = user.preference.disliked.shop.length - 1; i >= 0; i--) {
              if (user.preference.disliked.shop[i] === req.params.id) {
                  user.preference.disliked.validUntil[i] = date;
              }
            }
          }
          user.save().then( (doc)=> {
          res.status(200).json({
            message: 'Success!'
          })
      }, (e) => {
          res.status(400).send(e);
          console.log('Cannot update user content.')
      })
    } else {
      // 409 Conflict if shop already exist in liked
      console.log('Shop already preferred!');
      res.status(409).json({
       message: 'Shop already preferred!'
      });
    }
   }, (e) => {
          res.status(404).send(e);
          console.log('User not found.');
      })
  } else {console.log('Invalid ID!')}
})

module.exports = router;
