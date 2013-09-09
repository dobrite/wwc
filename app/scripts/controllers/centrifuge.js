(function() {
    'use strict';

    var root = this;

    root.define([
        'centrifuge',
        'backbone',
        'underscore',
        'communicator'
    ],
    function( Centrifuge, Backbone, _, Communicator ) {

        return Backbone.Marionette.Controller.extend({

            initialize: function( options ) {
                console.log("initialize a Centrifuge Controller");

                this.options = options || {};

            }

        });

    });
}).call( this );
