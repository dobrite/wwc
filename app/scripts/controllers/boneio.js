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
                this.options = options || {};

                _.bindAll(this, 'onConnect');
                _.bindAll(this, 'onConnecting');
                _.bindAll(this, 'onDisconnect');
                _.bindAll(this, 'onJoin');
                _.bindAll(this, 'onRecvChatMessage');
            },

            setCommunicator: function (communicator) {
                this.communicator = communicator || Communicator;
                this.communicator.vent.on('io:sendChatMessage', this.onSendChatMessage, this);
            },

            connect: function (host, options) {
                options = this.merge(options);

                this.socket = this.io.connect(host, options);
                this.socket.on('connect', this.onConnect);
                this.socket.on('connecting', this.onConnecting);
                this.socket.on('disconnect', this.onDisconnect);
                this.socket.on('join', this.onJoin);
                this.socket.on('chatMessage', this.onRecvChatMessage);
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

            onJoin: function (data) {
                this.communicator.vent.trigger('io:join', data);
            },

            onSendChatMessage: function (data) {
                this.socket.emit('chatMessage', data);
            },

            onRecvChatMessage: function (data) {
                console.log("onRecvChatMessage");
                console.log(data);
                this.communicator.vent.trigger('io:recvChatMessage', data);
            },

            merge: function(options) {
                return _.extend(this.options, options || {});
            },
        });

    });
}).call( this );
