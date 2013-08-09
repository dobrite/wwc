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

                this.io = io;
                this.bone = bone;

            },

            connect: function( options ) {

                options = options || {};

                this.socket = this.io.connect("", {
                    'auto connect': 'false'
                });

                this.bone.set('io.options', {
                    socket: this.socket
                });

            },
        });

    });
}).call( this );
