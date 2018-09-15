'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var DeliverableSchema = new Schema({
    pickupLocation:{
        type: String,
        trim: true,
        required: true
    },
    deliveryLocation:{
        type: String,
        trim: true,
        required: true
    },
    pickupCoordinate:{
        type: String,
        trim: true,
        required: true
    },
    deliveryCoordinate:{
        type: String,
        trim: true,
        required: true
    },
    pickupBefore: {
        type: Date,
        default: Date.now
    },
    deliverBefore: {
        type: Date,
        default: Date.now
    },
    info: {
        type: String,
        trim: true,
        required: false
    },
    size: {
        type: String,
        trim: true,
        required: false
    },
    weight: {
        type: Number,
        trim: true,
        required: false
    },
    status: {
        type: String,
        trim: true,
        lowercase: true
    },
    senderId: {
        type: String,
        required: true
    },
    delivererId: {
        type: String,
        default: -1
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Deliverable', DeliverableSchema);
