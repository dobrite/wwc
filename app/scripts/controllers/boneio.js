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
                _.bindAll(this, 'onConnecting');
                _.bindAll(this, 'onDisconnect');
                _.bindAll(this, 'onJoin');
            },

            connect: function (host, options) {
                options = this.merge(options);

                this.socket = this.io.connect(host, options);
                this.socket.on('connect', this.onConnect);
                this.socket.on('connecting', this.onConnecting);
                this.socket.on('disconnect', this.onDisconnect);
                this.socket.on('join', this.onJoin);

                this.socket.on('news', function (data) {
                    console.log(data);
                    this.socket.emit('my other event', { my: 'data' });
                });
            },

            onConnect: function () {
                this.communicator.vent.trigger('io:connect');
            },

            onConnecting: function () {
                this.communicator.vent.trigger('io:connecting');
            },

            disconnect: function () {
                this.socket.disconnect();
            },

            onDisconnect: function () {
                this.communicator.vent.trigger('io:disconnect');
            },

            onJoin: function (data, callback) {
                console.log("onJoin");
                this.communicator.vent.trigger('io:join');
            },

            merge: function(options) {
                return _.extend(this.options, options || {});
            },
        });

    });
}).call( this );
