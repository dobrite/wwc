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
            },

            connect: function(host, options) {
                options = this.merge(options);

                var socket = this.io.connect(host, options);
                this.socket = socket.socket;

                this.socket.on('connect', this.onConnect);
            },

            onConnect: function() {
                this.communicator.vent.trigger('io:connect');

                this.on('message', function(){
                });
            },

            merge: function(options) {
                return _.extend(this.options, options || {});
            },
        });

    });
}).call( this );
