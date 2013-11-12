define([
    'backbone',
    'hbs!templates/item/message_template',
    'hbs!templates/item/notify_template',
],
function (Backbone, MessageTemplate, NotifyTemplate) {

    var MessageItemView = Backbone.Marionette.ItemView.extend({
        tagName: "p",

        initialize: function() {},

        getTemplate: function() {
            //TODO add {sort: false} upstream after initial sort
            //otherwise were sorting all messages every time
            var template = MessageTemplate;

            if (this.model.get("type") === 'join'){
                template = NotifyTemplate;
            } else if (this.model.get("type") === 'leave'){
                template = NotifyTemplate;
            }

            return {
                type: 'handlebars',
                template: template,
            };
        },

        ui: {},

        events: {},

        onRender: function() {},
    });

    return MessageItemView;

});
