define([
    'backbone'
],
function (Backbone) {
    //TODO could use subModelTypes for Admin, etc.

    var UserModel = Backbone.RelationalModel.extend({

        initialize: function(data, options) {
            this.set("nick", data.user_id);
            this.set("id", data.client_id);
        },

        defaults: {
            nick: 'Guest-' + Math.floor((Math.random()*9999)+1),
            id: '',
            //self: false,
        },

    });

    return UserModel;

});
