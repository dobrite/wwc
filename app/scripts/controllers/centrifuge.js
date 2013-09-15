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
                _.bindAll(this, 'onPublishSuccess');
                _.bindAll(this, 'onPublishError');
                _.bindAll(this, 'onPresenceSuccess');
                _.bindAll(this, 'onPresenceError');
                _.bindAll(this, 'onHistory');
                _.bindAll(this, 'onMessage');
                _.bindAll(this, 'onError');
            },

            connect: function (options) {
                options = this.merge(options);

                this.centrifuge.configure(options);

                this.centrifuge.on('connect', this.onConnect);
                this.centrifuge.on('disconnect', this.onDisconnect);
                this.centrifuge.on('history', this.onHistory);
                this.centrifuge.on('message', this.onMessage);
                this.centrifuge.on('error', this.onError);

                this.centrifuge.connect();
            },

            onConnect: function () {
                this.communicator.vent.trigger('ws:connect');
            },

            disconnect: function () {
                this.centrifuge.disconnect();
            },

            onDisconnect: function () {
                this.communicator.vent.trigger('ws:disconnect');
            },

            subscribe: function (channel) {
                this.subscription = this.centrifuge.subscribe(channel, this.onMessage);

                this.subscription.on('subscribe:success', this.onSubscribeSuccess);
                this.subscription.on('subscribe:error', this.onSubscribeError);
                this.subscription.on('publish:success', this.onPublishSuccess);
                this.subscription.on('publish:error', this.onPublishError);
                this.subscription.on('presence:success', this.onPresenceSuccess);
                this.subscription.on('presence:error', this.onPresenceError);
            },

            onSubscribeSuccess: function () {
                this.communicator.vent.trigger('ws:subscribe:success');
            },

            onSubscribeError: function () {
                this.communicator.vent.trigger('ws:subscribe:error');
            },

            unsubscribe: function () {
                this.subscription.unsubscribe();
            },

            publish: function (data) {
                this.subscription.publish(data);
            },

            onPublishSuccess: function (data) {
                this.communicator.vent.trigger('ws:publish:success');
            },

            onPublishError: function (data) {
                this.communicator.vent.trigger('ws:publish:error');
            },

            presence: function (data) {
                this.subscription.presence(function (data) {
                    console.log(data);
                });
            },

            onPresenceSuccess: function (data) {
                console.log("presence success");
                this.communicator.vent.trigger('ws:presence:success');
            },

            onPresenceError: function (data) {
                console.log("presence error");
                this.communicator.vent.trigger('ws:presence:error');
            },

            onHistory: function (data) {
                this.communicator.vent.trigger('ws:history');
            },

            onMessage: function (data) {
                this.communicator.vent.trigger('ws:message');
            },

            onError: function (data) {
                this.communicator.vent.trigger('ws:error');
            },

            merge: function (options) {
                return _.extend(this.options, options || {});
            },

        });

    });
}).call( this );
