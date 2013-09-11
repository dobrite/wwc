(function() {
    'use strict';

    var root = this;

    root.define([
        'centrifuge',
        'backbone',
        'underscore',
        'communicator',
        'sockjs-client'
    ],
    function (Centrifuge, Backbone, _, Communicator) {

        return Backbone.Marionette.Controller.extend({

            initialize: function (options) {
                console.log("initialize a Centrifuge Controller");

                this.options = options || {};
            },

            setCommunicator: function (communicator) {
                this.communicator = communicator || Communicator;
                this.communicator.vent.on('io:sendChatMessage', this.onSendChatMessage, this);
            },

            connect: function (options) {
                options = this.merge(options);

                this.centrifuge = new Centrifuge(options);

                this.centrifuge.on('connect', this.onConnect);
                this.centrifuge.on('connecting', this.onConnecting);
                this.centrifuge.on('disconnect', this.onDisconnect);
                this.centrifuge.on('join', this.onJoin);
                this.centrifuge.on('chatMessage', this.onRecvChatMessage);

                this.centrifuge.connect();
            },

            onConnect: function () {
                console.log("Connect!");
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
                this.communicator.vent.trigger('io:recvChatMessage', data);
            },
            merge: function (options) {
                return _.extend(this.options, options || {});
            }
        });

    });
}).call( this );
