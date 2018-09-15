'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    fullName:{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    phoneNo: {
        type: String,
        trim: true,
        required: true
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
}

mongoose.model('User', UserSchema);
