// Global dependencies
const distance = require('geo-distance');
const ObjectId = require('mongodb').ObjectID;
// Local dependencies
const {User} = require('../models/user');
const {Shop} = require('../models/shop');

// Fetch nearby shops function
exports.nearby = (req,res) => {
  User.findById(req.userData.userId).then( (user) => {
      // Storing valid dislikde shops in temporary array
      let disliked = [];
      for (let i=0; i<user.preference.disliked.shop.length; i++) {
          if (user.preference.disliked.validUntil[i]>=Date.now()) {
            disliked.push(user.preference.disliked.shop[i]);
          }
      }
      // Fetching shops that aren't liked or disliked
      Shop.find( {
          _id: { $nin:
              disliked.concat(user.preference.liked)}
      }).then( (shops) => {
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
          // Success case
          console.log('Nearby shops displayed by '+req.userData.email);
          res.status(200).json({
            message: 'Success!',
            shops: shops
          })
      }, (e) => {
        // Error case
        res.status(404).send(e);
        console.log('Unable to fetch nearby shops by '+req.userData.email);
         })
  })
}

// Fetch preferred shops function
exports.preferred = (req,res) => {
  User.findById(req.userData.userId).then( (user) => {
      Shop.find( {
          _id: { $in:
              user.preference.liked }
      }).then( (shops) => {
          // Success case
          console.log('Preferred shops displayed by '+req.userData.email);
          res.status(200).json({
            shops: shops
          })
      }, (e) => {
        // Error case
        res.status(404).send(e);
        console.log('Unable to fetch preferred shops by '+req.userData.email);
      })
  })
}

// Like a shop function
exports.like = (req,res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.userData.userId).then( (user) => {
      // Storing valid dislikde shops in temporary array
      let disliked = [];
      for (let i=0; i<user.preference.disliked.shop.length; i++) {
        if (user.preference.disliked.validUntil[i]>=Date.now()) {
          disliked.push(user.preference.disliked.shop[i]);
        }
      }
      // If no similar preferred shop or valid disliked shop exists
      if (!user.preference.liked.includes(req.params.id) || !disliked.includes(req.params.id)) {
        user.preference.liked.push(req.params.id);
        user.save().then( ()=> {
          // Success case
          console.log(req.userData.email + ' liked the shop: ' + req.params.id);
          res.status(200).json({
            message: 'Success!'
          });
        }, (e) => {
          // Error case
          res.status(400).send(e);
          console.log(req.userData.email + ' cannot like the shop: ' + req.params.id);
           })
      } else {
        // 409 Conflict
        console.log(req.userData.email + 'already preferred the shop: ' + req.params.id);
        res.status(409).json({
          message: 'Shop already preferred!'
        });
      }
    }, (e) => {
        // User cannot be found error
        res.status(404).send(e);
        console.log('An error occurred while trying to find user ' + req.userData.email);
       })
  } else {
    // Error on incorrect shop ID
    res.status(401).json({
      message: 'Invalid shop Id.'
    })
    console.log('Invalid shop ID ' + req.params.id + ' query from ' + req.userData.email);
  }
}

// Remove liked shop function
exports.removeLike = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.userData.userId).then( (user) =>{
      // Confirming the existence of the desired liked shop
      if (user.preference.liked.includes(req.params.id)) {
        for (var i = user.preference.liked.length - 1; i >= 0; i--) {
          if (user.preference.liked[i] === req.params.id) {
            user.preference.liked.splice(i, 1);
          }
        }
        user.save().then( ()=> {
          // Success call
          console.log(req.userData.email + ' removed ' + req.params.id + ' from their preferred shops');
          res.status(200).json({
            message: 'Success!'
          });
        }, (e) => {
          // Fail to remove liked shop
          res.status(400).send(e);
          console.log('Cannot update content for user' + req.userData.email)
           })
      } else {
        // 404 Resource not found
        console.log(req.params.id + 'already preferred by' + req.userData.id);
        res.status(404).json({
          message: ' preferred!'
        });
      }
    }, (e) => {
          // User not found error
          res.status(404).send(e);
          console.log('User '+ req.userData.id +' not found.');
       })
  } else {
    // Error on incorrect shop ID
    res.status(401).json({
      message: 'Invalid shop Id.'
    })
    console.log('Invalid shop ID ' + req.params.id + ' query from ' + req.userData.email);
  }
}

// Dislike a shop function
exports.dislike = (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    User.findById(req.userData.userId).then( (user) =>{
      // Check if shop doesn't exist in liked
      if (!user.preference.liked.includes(req.params.id)) {
        const date = new Date();
        date.setHours(date.getHours() + 2);
        // Check if shop doesn't exist in disliked
        if (!user.preference.disliked.shop.includes(req.params.id)) {
          user.preference.disliked.shop.push(req.params.id);
          user.preference.disliked.validUntil.push(date);
        } else {
          // Update ValidUntil if shop already exist in disliked
          for (var i = user.preference.disliked.shop.length - 1; i >= 0; i--) {
            if (user.preference.disliked.shop[i] === req.params.id) {
                user.preference.disliked.validUntil.splice(i, 1, date);
            }
          }
        }
        // Success case
        user.save().then( ()=> {
          console.log(req.userData.email + ' disliked the shop:' + req.params.id);
          res.status(200).json({
            message: 'Success!'
          })
        }, (e) => {
          // Error saving user preference
          console.log(req.userData.email + ' cannot dislike ' + req.params.id);
          res.status(400).send(e);
           })
      } else {
        // 409 Conflict if shop already exist in liked
        console.log(req.userData.email + ' attempted to dislike ' + req.params.id + ' which was already liked');
        res.status(409).json({
          message: 'Shop already preferred!'
        });
      }
    }, (e) => {
        // Error finding user
        console.log('User ' + req.userData.userId + ' not found');
        res.status(404).send(e);
       })
  } else {
    // Error on incorrect shop ID
    res.status(401).json({
      message: 'Invalid shop Id.'
    })
    console.log('Invalid shop ID ' + req.params.id + ' query from ' + req.userData.email);
  }
}
