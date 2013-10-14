define([
    'backbone',
    'hbs!templates/item/input_template'
],
function (Backbone, InputTemplate) {

    var InputItemView = Backbone.Marionette.ItemView.extend({
        tagName: "p",

        initialize: function() {
            console.log("initialize a InputItemView");
        },

        template: {
            type: 'handlebars',
            template: InputTemplate
        },

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function() {},
    });

    return InputItemView;

});
