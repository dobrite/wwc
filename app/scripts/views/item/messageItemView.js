(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!templates/item/messageTemplate'
    ],
    function( Backbone, MessageTemplate ) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({
            tagName: "p",

            initialize: function() {
                console.log("initialize a Message ItemView");
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
            onRender: function() {
                console.log("render");
            }
        });

    });
}).call( this );
