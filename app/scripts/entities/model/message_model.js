define([
    'backbone',
    'moment',
],
function (Backbone, moment) {

    return Backbone.RelationalModel.extend({

        defaults: {
            ts: moment().format("HH:mm"),
            nick: '',
            text: '',
        },

    });

});
