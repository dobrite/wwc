define([
    'backbone',
    'moment',
],
function (Backbone, moment) {

    return Backbone.Model.extend({

        initialize: function(data, options) {
            this.set("id", data.uid);
            this.set("text", data.data);
            this.set("user_id", data.client.user_id);
            this.set("user", data.client);
        },

        defaults: function () {
            this.set('ts', moment().format("HH:mm:ss"));
            this.set('nick', '');
            this.set('text', '');
        },

    });

});
