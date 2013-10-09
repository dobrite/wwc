(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!templates/item/nickViewTemplate'
    ],
    function(Backbone, NickViewTemplate) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log("initialize a nickView ItemView");
            },

            template: {
                type: 'handlebars',
                template: NickViewTemplate
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
