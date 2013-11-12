define([
    'backbone',
    'uuid',
],
function (Backbone, uuid) {

    return Backbone.Model.extend({

        defaults: function () {

            this.set('id', uuid.v4());
            this.set('ts', moment().unix());
            this.set('channel', 'b');
            this.set('nick', '');
            this.set('text', '');
            this.set('type', 'message');

        },

    });

});
