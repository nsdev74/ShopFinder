const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;



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
            shop: [{type: String}],
            validUntil: [{type: Date}]
        }
       }
})

userSchema.plugin(uniqueValidator);

// User Model
var User = mongoose.model('User', userSchema)

module.exports = {User}
