define([
    'backbone',
    'hbs!templates/item/channel_template'
],
function (Backbone, ChannelTemplate) {

    var ChannelItemView = Backbone.Marionette.ItemView.extend({
        tagName: "li",

        initialize: function() {
        },

        template: {
            type: 'handlebars',
            template: ChannelTemplate
        },

        ui: {},

        triggers: {
            "click .js-tab": "change",
        },

        events: {},

        onRender: function() {},
    });

    return ChannelItemView;

});
