var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    preference : {
        liked: [String],
        disliked: {
            shop: [{type: String}],
            validUntil: [{type: Date}]
        }
       }
})

// User Model
var User = mongoose.model('User', userSchema)

module.exports = {User}
