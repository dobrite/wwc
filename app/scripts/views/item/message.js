(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!tmpl/item/message_tmpl'
    ],
    function( Backbone, MessageTmpl  ) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function() {
                console.log("initialize a Message ItemView");
            },

            template: {
                type: 'handlebars',
                template: MessageTmpl
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function() {}
        });

    });
}).call( this );
