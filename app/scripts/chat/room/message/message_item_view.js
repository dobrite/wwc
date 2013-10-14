define([
    'backbone',
    'hbs!templates/item/message_template'
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

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function() {},
    });

    return MessageItemView;

});
