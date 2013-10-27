define([
    'backbone',
    'hbs!templates/item/nick_template'
],
function (Backbone, NickTemplate) {

    var NickItemView = Backbone.Marionette.ItemView.extend({
        tagName: "p",

        initialize: function() {
        },

        template: {
            type: 'handlebars',
            template: NickTemplate
        },

        ui: {},

        events: {},

        onRender: function() {},
    });

    return NickItemView;

});
