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
                this.subscription = null;

                if(typeof options.communicator !== 'undefined'){
                    this.communicator = options.communicator;
                }else{
                    this.communicator = Communicator;
                }

                _.bindAll(this, 'onConnect');
                _.bindAll(this, 'onDisconnect');
                _.bindAll(this, 'onSubscribeSuccess');
                _.bindAll(this, 'onSubscribeError');
                _.bindAll(this, 'onUnsubscribeSuccess');
                _.bindAll(this, 'onUnsubscribeError');
                _.bindAll(this, 'onPublish');
                _.bindAll(this, 'onPresence');
                _.bindAll(this, 'onHistory');
                _.bindAll(this, 'onMessage');
                _.bindAll(this, 'onError');
            },

            connect: function (options) {
                options = this.merge(options);

                this.centrifuge.configure(options);

                this.centrifuge.on('connect', this.onConnect);
                this.centrifuge.on('disconnect', this.onDisconnect);
                this.centrifuge.on('publish', this.onPublish);
                this.centrifuge.on('presence', this.onPresence);
                this.centrifuge.on('history', this.onHistory);
                this.centrifuge.on('message', this.onMessage);
                this.centrifuge.on('error', this.onError);

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

            subscribe: function (channel) {
                console.log('subscribing on: ' + channel);
                this.subscription = this.centrifuge.subscribe(channel, this.onMessage);

                this.subscription.on('subscribe:success', this.onSubscribeSuccess);
                this.subscription.on('subscribe:error', this.onSubscribeError);
            },

            onSubscribeSuccess: function () {
                console.log("Subscribe Success");
                this.communicator.vent.trigger('ws:subscribe:success');
            },

            onSubscribeError: function () {
                console.log("Subscribe Error");
                this.communicator.vent.trigger('ws:subscribe:error');
            },

            unsubscribe: function () {
                console.log('unsubscribing');

                this.subscription.on('unsubscribe:success', this.onUnsubscribeSuccess);
                this.subscription.on('unsubscribe:error', this.onUnsubscribeError);

                this.subscription.unsubscribe();
            },

            onUnsubscribeSuccess: function () {
                console.log("Unsubscribe Success");
                this.communicator.vent.trigger('ws:unsubscribe:success');
            },

            onUnsubscribeError: function () {
                console.log("Unsubscribe Error");
                this.communicator.vent.trigger('ws:unsubscribe:error');
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

            onError: function (data) {
                console.log("Error");
                console.log(data);
                this.communicator.vent.trigger('ws:error');
            },

            merge: function (options) {
                return _.extend(this.options, options || {});
            },

        });

    });
}).call( this );
