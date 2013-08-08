(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!tmpl/item/message_tmpl'
    ],
    function( Backbone, messageTemplate ) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({
            tagName: "p",

            initialize: function() {
                console.log("initialize a Message ItemView");
            },

            template: {
                type: 'handlebars',
                template: messageTemplate
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
