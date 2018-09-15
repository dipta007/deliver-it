'use strict'

module.exports = function(app) {
    var userHandler = require('../controller/userController');

    app.route('/auth/register')
        .post(userHandler.register)
        

    app.route('/auth/sign_in')
        .post(userHandler.signIn)

};