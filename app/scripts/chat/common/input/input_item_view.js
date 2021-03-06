define([
    'backbone',
    'scripts/communicator',
    'hbs!templates/item/input_template'
],
function (Backbone, communicator, InputTemplate) {

    var InputItemView = Backbone.Marionette.ItemView.extend({
        tagName: "div",
        className: "input-group",

        initialize: function() {},

        template: {
            type: 'handlebars',
            template: InputTemplate
        },

        ui: {
            input: ".js-input"
        },

        events: {
            "keypress .js-input": "inputEnter",
            "click .js-input-btn": "inputSubmit",
        },

        onRender: function() {},

        inputSubmit: function () {
            var chatMessage = this.ui.input.val();

            if(chatMessage){
                this.ui.input.val('');
                communicator.vent.trigger("chat:input:message", chatMessage);
            }
        },

        inputEnter: function (event) {
            if(event.which === 13) {
                this.inputSubmit();
            }
        },

    });

    return InputItemView;

});
