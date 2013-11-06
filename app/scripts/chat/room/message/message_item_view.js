define([
    'backbone',
    'hbs!templates/item/message_template',
],
function (Backbone, MessageTemplate) {

    var MessageItemView = Backbone.Marionette.ItemView.extend({
        tagName: "p",

        initialize: function() {},

        template: {
            type: 'handlebars',
            template: MessageTemplate
        },

        serializeData: function(){
            var data = {};
            data = this.model.toJSON();
            console.log(data);
            return data;
        },

        ui: {},

        events: {},

        onRender: function() {},
    });

    return MessageItemView;

});
