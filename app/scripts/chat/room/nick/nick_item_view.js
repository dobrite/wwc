define([
    'backbone',
    'hbs!templates/item/nick_template'
],
function (Backbone, NickTemplate) {

    var NickItemView = Backbone.Marionette.ItemView.extend({
        tagName: "p",

        initialize: function() {
            console.log("initialize a NickItemView");
        },

        template: {
            type: 'handlebars',
            template: NickTemplate
        },

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function() {},
    });

    return NickItemView;

});
