(function() {
    'use strict';

    var root = this;

    root.define([
        'boneio',
        'backbone',
        'communicator',
    ],
    function( bone, Backbone, Communicator ) {

        return Backbone.Marionette.Controller.extend({

            initialize: function( options ) {
                console.log("initialize a Boneio Controller");

                var socket = options.io.connect();

                bone.set('io.options', {
                    socket: socket
                });

            }
        });

    });
}).call( this );
