define([
    'backbone',
    'moment',
],
function (Backbone, moment) {

    return Backbone.Model.extend({

        defaults: {
            ts: moment().format("HH:mm"),
            nick: '',
            text: '',
        },

    });

});
