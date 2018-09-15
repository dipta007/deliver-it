'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var DeliverySchema = new Schema({
    delivererId:{
        type: String,
        trim: true,
        required: true
    },
    senderId:{
        type: String,
        trim: true,
        required: true
    },
    deliverableId: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        lowercase: true,
        default: "peniding"
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

DeliverySchema.pre('save', function(next) {
    this.lastUpdated = Date.now()
    next()
  });

mongoose.model('Delivery', DeliverySchema);
