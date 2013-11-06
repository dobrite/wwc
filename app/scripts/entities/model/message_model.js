define([
    'backbone',
],
function (Backbone) {

    return Backbone.Model.extend({

        defaults: function () {

            this.set('ts', moment().unix());
            this.set('channel', 'b');
            this.set('nick', '');
            this.set('type', 'b');
            this.set('text', '');

        },

    });

});
