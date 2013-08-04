(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'models/message',
        'hbs!tmpl/item/message_tmpl'
    ],
    function( Backbone, Message, MessageTemplate  ) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function() {
                console.log("initialize a Message ItemView");
            },

            model: Message,

            template: {
                type: 'handlebars',
                template: MessageTemplate
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
