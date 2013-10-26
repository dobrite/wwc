define([
    'backbone'
],
function (Backbone) {
    //TODO could use subModelTypes for Admin, etc.

    var UserModel = Backbone.RelationalModel.extend({

        defaults: {
            //more for documentation:
            user_id: 'Guest-' + Math.floor((Math.random()*9999)+1),
            client_id: '',
            //self: false,
        },

    });

    return UserModel;

});
