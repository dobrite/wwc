(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!templates/item/chatViewTemplate'
    ],
    function(Backbone, ChatViewTemplate) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log("initialize a chatView ItemView");
            },

            template: {
                type: 'handlebars',
                template: ChatViewTemplate
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
