(function() {
    'use strict';

    var root = this;

    root.define([
        'centrifuge',
        'backbone',
        'underscore',
        'scripts/communicator',
        'sockjs-client'
    ],
    function (Centrifuge, Backbone, _, Communicator) {

        return Backbone.Marionette.Controller.extend({

            initialize: function (options) {
                this.options = options || {};
                this.communicator = options.communicator || Communicator;
                this.centrifuge = new Centrifuge();

                _.extend(this.centrifuge, Backbone.Events);
                _.bindAll(this, 'onEvent');
                _.bindAll(this, 'setCommandHandlers');

                this.centrifuge.on('all', this.onEvent);

                this.setCommandHandlers();
            },

            connect: function (options) {
                _.extend(this.options, options || {});
                this.centrifuge.configure(this.options);
                this.centrifuge.connect();
            },

            onEvent: function (event, params) {
                this.communicator.vent.trigger('ws:' + event, params);
            },

            disconnect: function () {
                this.centrifuge.disconnect();
                this.centrifuge.on('disconnect', function () {
                    this.centrifuge.off('all');
                }, this);
            },

            subscribe: function (channel) {
                this.subscription = this.centrifuge.subscribe(channel, this.onMessage);
                _.extend(this.subscription, Backbone.Events);
                this.subscription.on('all', this.onEvent);
            },

            unsubscribe: function () {
                this.subscription.unsubscribe();
                this.subscription.off('all');
            },

            publish: function (data) {
                this.subscription.publish(data);
            },

            presence: function () {
                this.subscription.presence(function (data) {
                    //something with data
                });
            },

            history: function () {
                this.subscription.history(function (data) {
                    //something with data
                });
            },

            setCommandHandlers: function () {
                console.log("setting command handlers");
                this.communicator.command.setHandler("ws:connect", function (options) {
                    this.connect(options);
                }, this);
                this.communicator.command.setHandler("ws:message", function (message) {
                    this.publish(message);
                }, this);
            },

        });

    });
}).call( this );
