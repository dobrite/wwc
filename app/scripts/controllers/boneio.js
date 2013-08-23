(function() {
    'use strict';

    var root = this;

    root.define([
        'socketio',
        'backbone',
        'underscore',
        'communicator',
    ],
    function( io, Backbone, _, Communicator ) {

        return Backbone.Marionette.Controller.extend({

            initialize: function(options) {
                console.log("initialize a Boneio Controller");

                this.io = io;
                this.communicator = options.communicator || Communicator;
                this.options = options || {};

                _.bindAll(this, 'onConnect');
                _.bindAll(this, 'onDisconnect');
            },

            connect: function(host, options) {
                options = this.merge(options);

                var socket = this.io.connect(host, options);
                this.socket = socket.socket;

                this.socket.on('connect', this.onConnect);
                this.socket.on('disconnect', this.onDisconnect);
            },

            onConnect: function() {
                this.communicator.vent.trigger('io:connect');
            },

            disconnect: function(){
                this.socket.disconnect();
            },

            onDisconnect: function() {
                this.communicator.vent.trigger('io:disconnect');
            },

            merge: function(options) {
                return _.extend(this.options, options || {});
            },
        });

    });
}).call( this );
