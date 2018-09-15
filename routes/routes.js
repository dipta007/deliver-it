'use strict'

module.exports = function(app) {
    var userHandler = require('../controller/userController'),
        deliverableHandler = require('../controller/deliverableController');

    app.route('/auth/register')//
        .post(userHandler.register)
        

    app.route('/auth/sign_in')//
        .post(userHandler.signIn)

    app.route('/user')//
        .post(userHandler.getMyProfile)
    
    app.route('/user_id')//
        .post(userHandler.getProfile)

    app.route('/to_pick')
        .get(deliverableHandler.toPick)
    
    app.route('/to_deliver')
        .get(deliverableHandler.toDeliver)

    app.route('/create/deliverable')//
        .post(deliverableHandler.createDeliverable)

    app.route('/submit/request/delivery')
        .get(deliverableHandler.submitDeliveryRequest) 
        
    app.route('/search/request/assigned_delivery')//
        .get(deliverableHandler.searchAssignedDeliveryRequest)

    app.route('/search/request/requested_delivery')//
        .get(deliverableHandler.searchRequestedDeliveryRequest)

    app.route('/search/new_delivery')
        .post(deliverableHandler.searchNewDelivery)

    app.route('/approve/post')//
        .post(deliverableHandler.approvePost)
};
