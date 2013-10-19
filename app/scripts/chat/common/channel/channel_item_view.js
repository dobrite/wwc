define([
    'backbone',
    'hbs!templates/item/channel_template'
],
function (Backbone, ChannelTemplate) {

    var ChannelItemView = Backbone.Marionette.ItemView.extend({
        tagName: "li",

        initialize: function() {
            console.log("initialize a ChannelItemView");
        },

        template: {
            type: 'handlebars',
            template: ChannelTemplate
        },

        ui: {
            tab: ".js-tab"
        },

        events: {
            "click .js-tab": "onTabClick"
        },

        onTabClick: function (event) {
            event.preventDefault();
            this.ui.tab.tab("show");
        },

        onRender: function() {},
    });

    return ChannelItemView;

});
