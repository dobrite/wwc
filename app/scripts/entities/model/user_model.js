define([
    'backbone'
],
function (Backbone) {

    var UserModel = Backbone.Model.extend({

        defaults: {
            nick: 'Guest-' + Math.floor((Math.random()*9999)+1)
        },

    });

    return UserModel;

});
