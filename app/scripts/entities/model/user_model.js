define([
    'backbone'
],
function (Backbone) {

    var UserModel = Backbone.Model.extend({

        initialize: function(data, options) {
            this.set("nick", data.nick);
        },

        defaults: {
            nick: 'Guest-' + Math.floor((Math.random()*9999)+1),
        },

    });

    return UserModel;

});
