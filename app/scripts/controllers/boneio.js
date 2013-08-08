(function() {
    'use strict';

    var root = this;

    root.define([
        'socketio',
        'boneio',
        'backbone',
        'communicator',
    ],
    function( io, bone, Backbone, Communicator ) {

        return Backbone.Marionette.Controller.extend({

            initialize: function( options ) {
                console.log("initialize a Boneio Controller");

                var socket = io.connect("", {
                    'auto connect': 'false'
                });

                bone.set('io.options', {
                    socket: socket
                });

            }
        });

    });
}).call( this );
