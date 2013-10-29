define([
    'backbone'
],
function (Backbone) {

    var UserModel = Backbone.Model.extend({

        initialize: function(data, options) {
            this.set("nick", data.user_id);
            this.set("id", data.user_id);
        },

        defaults: {
            nick: 'Guest-' + Math.floor((Math.random()*9999)+1),
            id: '',
            //self: false,
        },

    });

    return UserModel;

});
