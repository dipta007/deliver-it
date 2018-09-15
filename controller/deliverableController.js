'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User'),
    Deliverable = mongoose.model('Deliverable'),
    constant = require('../constants');

let status = {
    unassigned: "unassigned",
    requested: "requested",
    assigned: "assigned",
    picked: "picked",
    delivered: "delivered",
    expired: "expired"
};


function register(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;
        return res.json(user);
      }
    });
};

function toPick(req, res) {
    try {
        var decoded = jwt.verify(req.headers.token, 'RESTFULAPIs');
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
        var decoded = jwt.verify(req.headers.token, 'RESTFULAPIs');
        var user_id = decoded._id;
        Deliverable.find({ delivererId: user_id, status: 'picked' }, function(err, deliverableToDeliver) {
            if (err) throw err;
            return res.json(deliverableToDeliver);
        });
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function changeStatus(req, res) {
    var deliverableId = req.body.deliverableId;
    var status = req.body.status;
    try {
        Deliverable.findOneAndUpdate({ _id: deliverableId},{status: status}, function(err, deliverableToDeliver) {
            if (err) throw err;
            return res.json(deliverableToDeliver);
        });
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function createDeliverable(req, res) {
    try {
        var decoded = jwt.verify(req.headers.token, 'RESTFULAPIs');
        var user_id = decoded._id;
        var deliverable = new Deliverable(req.body)

        Deliverable.save(function(err, deliverableToDeliver) {
            if (err) {
                return res.status(400).send({
                  message: err
                });
            } else {
                return res.json(deliverableToDeliver);
            }
        });
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

function searchDeliverable(req, res) {//TODO
    try {
        var decoded = jwt.verify(req.headers.token, 'RESTFULAPIs');
        var user_id = decoded._id;

        Deliverable.find({ delivererId: user_id, status: 'picked' }, function(err, deliverableToDeliver) {
            if (err) throw err;
            return res.json(deliverableToDeliver);
        });
    } catch(err) {
        return res.json({'error': 'Login error'});
    }
}

module.exports = {
    toPick: toPick,
    toDeliver: toDeliver,
    changeStatus: changeStatus,
    createDeliverable: createDeliverable,
    searchDeliverable: searchDeliverable
}
