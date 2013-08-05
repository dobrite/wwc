(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'views/item/messageItemView'
    ],
    function( Backbone, MessageItemView ) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.CollectionView.extend({

            initialize: function() {
                console.log("initialize a Messages CollectionView");
            },

            itemView: MessageItemView,

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function() {}
        });

    });
}).call( this );
