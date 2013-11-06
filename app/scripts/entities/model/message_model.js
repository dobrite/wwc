define([
    'backbone',
    'moment',
],
function (Backbone, moment) {

    return Backbone.Model.extend({

        initialize: function (message) {

            //use it if we got it otherwise create one
            //TODO keep in unix form here only convert
            //for display - handlebars-helpers, helper-moment
            var ts = (message.ts)?message.ts:moment().unix();
            this.set('ts', moment.unix(ts).format("HH:mm:ss"));

        },

        defaults: function () {

            this.set('ts', moment().format("HH:mm:ss"));
            this.set('channel', 'b');
            this.set('nick', '');
            this.set('type', 'b');
            this.set('text', '');

        },

    });

});
