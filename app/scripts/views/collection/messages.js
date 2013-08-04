(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'views/item/message'
    ],
    function( Backbone, Message  ) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.CollectionView.extend({

            initialize: function() {
                console.log("initialize a Messages CollectionView");
            },

            itemView: Message,

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function() {}
        });

    });
}).call( this );
