define([
    'backbone',
    'hbs!templates/item/channel_template'
],
function (Backbone, ChannelTemplate) {

    var ChannelItemView = Backbone.Marionette.ItemView.extend({
        tagName: "div",

        initialize: function() {
            console.log("initialize a ChannelItemView");
        },

        template: {
            type: 'handlebars',
            template: ChannelTemplate
        },

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function() {},
    });

    return ChannelItemView;

});
