// Global dependencies
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



// User Schema
const userSchema = new mongoose.Schema({
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
            shop: [String],
            validUntil: [Date]
        }
       }
})

userSchema.plugin(uniqueValidator);

// User Model
var User = mongoose.model('User', userSchema)

module.exports = {User}
