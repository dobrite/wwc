define([
    'backbone',
    'hbs!templates/item/message_template',
],
function (Backbone, MessageTemplate) {

    var MessageItemView = Backbone.Marionette.ItemView.extend({
        tagName: "p",

        initialize: function() {
            console.log("initialize a MessageItemView");
        },

        template: {
            type: 'handlebars',
            template: MessageTemplate
        },

        ui: {},

        events: {},

        onRender: function() {},
    });

    return MessageItemView;

});
