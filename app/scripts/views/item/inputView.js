(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!templates/item/inputViewTemplate'
    ],
    function(Backbone, InputViewTemplate) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log("initialize a inputView ItemView");
            },

            template: {
                type: 'handlebars',
                template: InputViewTemplate
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function () {},

        });

    });
}).call(this);
