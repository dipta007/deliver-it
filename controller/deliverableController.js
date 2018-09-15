'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User'),
    Deliverable = mongoose.model('Deliverable'),
    DeliveryRequest = mongoose.model('Delivery'),
    constant = require('../constants');

let status = {
    unassigned: "unassigned",
    requested: "requested",
    assigned: "assigned",
    picked: "picked",
    delivered: "delivered",
    expired: "expired"
};

function submitDeliveryRequest(req, res) {
    try {
        var decoded = jwt.verify(req.headers.authorization, 'RESTFULAPIs');
        var user_id = decoded._id;
        var deliverableId = req.body._id;
        var deliveryRequest = {deliverer_id: req.body.delivererId, status: "pending"};
        Deliverable.findOneAndUpdate({_id: user_id, $push: {deliveryRequests: deliveryRequest}}, function(err, data) {

        });
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function searchAssignedDeliveryRequest(req, res) {
    try {
        var decoded = jwt.verify(req.headers.authorization, 'RESTFULAPIs');
        var user_id = decoded._id;
        Deliverable.find({senderId: user_id, status: { $ne: 'unassigned' } })
        .sort({date: 'desc'}).exec(function(err, data) {
            console.log(data)
            return res.json(data);
        })
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function searchRequestedDeliveryRequest(req, res) {
    try {
        var decoded = jwt.verify(req.headers.authorization, 'RESTFULAPIs');
        var user_id = decoded._id;
        Deliverable.find({senderId: user_id, status: 'requested' })
        .sort({date: 'desc'}).exec(function(err, data) {
            console.log(data)
            return res.json(data);
        })
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function searchNewDelivery(req, res) { // TODO BIG
    try {
        var decoded = jwt.verify(req.headers.token, 'RESTFULAPIs');
        var user_id = decoded._id;
        var from = req.body.from
        var to = req.body.to
        
        Deliverable.find({_id: user_id, deliveryRequests: deliveryRequest});
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function toPick(req, res) {
    try {
        var decoded = jwt.verify(req.headers.authorization, 'RESTFULAPIs');
        var user_id = decoded._id;
        Deliverable.find({ delivererId: user_id, status: 'assigned' }, function(err, deliverableToPick) {
            if (err) throw err;
            return res.json(deliverableToPick);
        });
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function toDeliver(req, res) {
    try {
        var decoded = jwt.verify(req.headers.authorization, 'RESTFULAPIs');
        var user_id = decoded._id;
        Deliverable.find({ delivererId: user_id, status: 'picked' }, function(err, deliverableToDeliver) {
            if (err) throw err;
            return res.json(deliverableToDeliver);
        });
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function createDeliverable(req, res) {
    //console.log(req.headers);
    try {
        var decoded = jwt.verify(req.headers.authorization, 'RESTFULAPIs');
        var user_id = decoded._id;
        var deliverable = new Deliverable(req.body);
        deliverable.senderId = user_id;

        deliverable.save(function(err, deliverableToDeliver) {
            if (err) {
                return res.status(400).send({
                  message: err
                });
            } else {
                return res.json(deliverableToDeliver);
            }
        });
    } catch(err) {
        return res.json({'error': 'Login error' + req.headers.authorization});
    }
}

function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if (d>1) return Math.round(d)+"km";
	else if (d<=1) return Math.round(d*1000)+"m";
	return d;
}

function approvePost(req, res) {
    var decoded = jwt.verify(req.headers.authorization, 'RESTFULAPIs');
    var user_id = decoded._id;
    var status = req.body.status
    try {
        Deliverable.findOneAndUpdate({ _id: req.body._id },{status: status}, function(err, deliverableToDeliver) {
            if (err) throw err;
            return res.json(deliverableToDeliver);
        });
    } catch(err) {
        return res.json({'error': 'error'});
    }
}

module.exports = {
    toPick: toPick,
    toDeliver: toDeliver,
    createDeliverable: createDeliverable,
    submitDeliveryRequest: submitDeliveryRequest,
    searchNewDelivery: searchNewDelivery,
    searchAssignedDeliveryRequest: searchAssignedDeliveryRequest,
    searchRequestedDeliveryRequest: searchRequestedDeliveryRequest,
    approvePost: approvePost
}
