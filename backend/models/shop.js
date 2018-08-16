// Global dependencies
var mongoose = require('mongoose');

// Shop Schema
var shopSchema = new mongoose.Schema({
    picture: {
         type: String,
         trim: true
        },
    name: {
        type: String,
        trim: true
    },
    email: { type: String},
    city: { type: String },
    location : {
         type: {
            type: String
         },
         coordinates: [Number,Number]
        }
})

// Shop Model
var Shop = mongoose.model('Shop', shopSchema)


module.exports = {Shop}
