define([
    'backbone'
],
function (Backbone) {

    var UserModel = Backbone.RelationalModel.extend({

        defaults: {
            nick: 'Guest-' + Math.floor((Math.random()*9999)+1),
            self: false,
        },

    });

    return UserModel;

});
