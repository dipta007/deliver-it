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
    deliverableId: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Delivery', DeliverySchema);
