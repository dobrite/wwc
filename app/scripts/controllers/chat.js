(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone'
    ],
    function( Backbone, RegionManager, Communicator ) {

        return Backbone.Marionette.Controller.extend({

            initialize: function( options ) {
                console.log("initialize a Chat Controller");
            }
        });

    });
}).call( this );
