define([
    'backbone',
    'moment',
],
function (Backbone, moment) {

    return Backbone.Model.extend({

        defaults: function () {

            this.set('ts', moment().format("HH:mm:ss"));
            this.set('channel', 'b');
            this.set('nick', '');
            this.set('type', 'b');
            this.set('text', '');

        },

    });

});
