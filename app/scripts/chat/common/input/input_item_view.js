define([
    'backbone',
    'scripts/communicator',
    'hbs!templates/item/input_template'
],
function (Backbone, communicator, InputTemplate) {

    var InputItemView = Backbone.Marionette.ItemView.extend({
        tagName: "div",
        className: "input-group",

        initialize: function() {
            console.log("initialize a InputItemView");
        },

        template: {
            type: 'handlebars',
            template: InputTemplate
        },

        /* ui selector cache */
        ui: {
            input: ".js-input"
        },

        /* Ui events hash */
        events: {
            "keypress .js-input": "inputEnter",
            "click .js-input-btn": "inputSubmit",
        },

        /* on render callback */
        onRender: function() {},

        inputSubmit: function () {
            var chatMessage = this.ui.input.val();
            this.ui.input.val('');

            if(chatMessage){
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
