'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var DeliverableSchema = new Schema({
    pickup_location:{
        type: String,
        trim: true,
        required: true
    },
    delivery_location:{
        type: String,
        trim: true,
        required: true
    },
    pickup_coordinate:{
        type: String,
        trim: true,
        required: true
    },
    delivery_coordinate:{
        type: String,
        trim: true,
        required: true
    },
    pickup_before: {
        type: Date,
        default: Date.now
    },
    deliver_before: {
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
    sender_id: {
        type: String,
        required: true
    },
    deliverer_id: {
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
