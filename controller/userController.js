'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    constant = require('../constants'),
    User = mongoose.model('User');


function register(req, res) {
    var newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hashPassword = undefined;
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

function getProfile(req, res) {
  try {
      var user_id = req.body._id;
      User.findOne({ _id: user_id }, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.status(401).json({ message: 'User not found.' });
        } else if (user) {
          return res.json({user: user});
        }
    });
  }
  catch (err) {
      return res.json({'error': 'sth went wrong' + user_id});
  }
}

function getMyProfile(req, res) {
    try {
        var decoded = jwt.verify(req.body.token, 'RESTFULAPIs');
        var user_id = decoded._id;
        User.findOne({ _id: user_id }, function(err, user) {
          if (err) throw err;
          if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
          } else if (user) {
            return res.json({user: user});
          }
      });
    }
    catch (err) {
        return res.json({'error': 'sth went wrong' + req.body.token});
    }
}

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
    logInRequired: logInRequired,
    getMyProfile: getMyProfile,
    getProfile: getProfile
}
