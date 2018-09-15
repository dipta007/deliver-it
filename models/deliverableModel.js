'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;


var DeliverableSchema = new Schema({
    pickUpLocation:{
        type: String,
        trim: true,
        required: true
    },
    dropOffLocation:{
        type: String,
        trim: true,
        required: true
    },
    pickUpCoord:{
        type: Object,
        trim: true,
        required: true
    },
    dropOffCoord:{
        type: Object,
        trim: true,
        required: true
    },
    pickUpTime: {
        type: Date,
        default: Date.now
    },
    dropOffTime: {
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
    status: {
        type: String,
        trim: true,
        lowercase: true,
        default: "unassigned"
    },
    weight: {
        type: Number,
        trim: true,
        required: false
    },
    senderId: {
        type: String,
        required: true,
        default: ""
    },
    delivererId: {
        type: String,
        default: ""
    },
    deliveryRequests: {
        type: [Object],
        default: []
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

DeliverableSchema.pre('save', function(next) {
    this.lastUpdated = Date.now()
    next()
  });

mongoose.model('Deliverable', DeliverableSchema);
