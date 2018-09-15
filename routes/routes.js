'use strict'

module.exports = function(app) {
    var userHandler = require('../controller/userController'),
        deliverableHandler = require('../controller/deliverableController');

    app.route('/auth/register')
        .post(userHandler.register)
        

    app.route('/auth/sign_in')
        .post(userHandler.signIn)

    app.route('/user')
        .get(userHandler.getMyProfile)
    
    app.route('/user')
        .get(userHandler.getProfile)

    app.route('/to_pick')
        .get(deliverableHandler.toPick)
    
    app.route('/to_deliver')
        .get(deliverableHandler.toDeliver)

    app.route('/change_status')
        .post(deliverableHandler.changeStatus)

    app.route('/create/deliverable')
        .post(deliverableHandler.createDeliverable)

    app.route('/search/deliverables')
        .post(deliverableHandler.searchDeliverable)
};
