'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var DeliverySchema = new Schema({
    deliverer_id:{
        type: String,
        trim: true,
        required: true
    },
    deliverable_id: {
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
