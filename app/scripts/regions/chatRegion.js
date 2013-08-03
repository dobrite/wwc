(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone'
    ],
    function( Backbone ) {

        /* Return a Region class definition */
        return Backbone.Marionette.Region.extend({
            el: "#chat-pane",

            initialize: function() {
                console.log("initialize a Chatregion Region");
            }
        });

    });
}).call( this );
