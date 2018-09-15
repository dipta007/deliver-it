'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');


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

function signIn(req, res) {
    console.log(req.body)
    User.findOne({ email: req.body.email }, function(err, user) {
        console.log(user, jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs'))
        if (err) throw err;
        if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          } else {
            return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
          }
        }
    });
};

function logInRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

module.exports = {
    register: register,
    signIn: signIn,
    logInRequired: logInRequired
}