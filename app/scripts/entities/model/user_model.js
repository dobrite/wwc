define([
    'backbone'
],
function (Backbone) {

    var UserModel = Backbone.Model.extend({

        initialize: function(data, options) {
            //TODO is this the place for this?
            //some messages have id as client id
            //others were uuid4'ing id since cent doesn't send uuid
            var id = data.client_id || data.id;
            this.set("id", id);
            this.set("nick", data.nick);
        },

        defaults: {
            nick: 'Guest-' + Math.floor((Math.random()*9999)+1),
        },

    });

    return UserModel;

});
