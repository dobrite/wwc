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
                this.centrifuge = new Centrifuge();

                if(typeof options.communicator !== 'undefined'){
                    this.communicator = options.communicator;
                }else{
                    this.communicator = Communicator;
                }

                _.bindAll(this, 'onConnect');
                _.bindAll(this, 'onDisconnect');
                _.bindAll(this, 'onSubscribe');
                _.bindAll(this, 'onUnsubscribe');
                _.bindAll(this, 'onPublish');
                _.bindAll(this, 'onPresence');
                _.bindAll(this, 'onHistory');
                _.bindAll(this, 'onMessage');
            },

            connect: function (options) {
                options = this.merge(options);

                this.centrifuge.configure(options);

                this.centrifuge.on('connect', this.onConnect);
                this.centrifuge.on('disconnect', this.onDisconnect);
                this.centrifuge.on('subscribe', this.onSubscribe);
                this.centrifuge.on('unsubscribe', this.onUnsubscribe);
                this.centrifuge.on('publish', this.onPublish);
                this.centrifuge.on('presence', this.onPresence);
                this.centrifuge.on('history', this.onHistory);
                this.centrifuge.on('message', this.onMessage);

                this.centrifuge.connect();
            },

            onConnect: function () {
                console.log("Connect!");
                this.communicator.vent.trigger('ws:connect');
            },

            disconnect: function () {
                this.centrifuge.disconnect();
            },

            onDisconnect: function () {
                console.log("Disconnect!");
                this.communicator.vent.trigger('ws:disconnect');
            },

            onSubscribe: function () {
                console.log("Subscribe");
                this.communicator.vent.trigger('ws:subscribe');
            },

            onUnsubscribe: function () {
                console.log("Unsubscribe");
                this.communicator.vent.trigger('ws:unsubscribe');
            },

            onPublish: function (data) {
                console.log("Publish");
                this.communicator.vent.trigger('ws:publish');
            },

            onPresence: function (data) {
                console.log("Presence");
                this.communicator.vent.trigger('ws:presence');
            },

            onHistory: function (data) {
                console.log("History");
                this.communicator.vent.trigger('ws:history');
            },

            onMessage: function (data) {
                console.log("Message");
                this.communicator.vent.trigger('ws:message');
            },

            merge: function (options) {
                return _.extend(this.options, options || {});
            },

            on: function (eventName, func) {
                this.on(eventName, func);
            }
        });

    });
}).call( this );
