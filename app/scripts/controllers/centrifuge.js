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

                _.extend(this.centrifuge, Backbone.Events);

                this.subscription = null;

                if(typeof options.communicator !== 'undefined'){
                    this.communicator = options.communicator;
                }else{
                    this.communicator = Communicator;
                }

                _.bindAll(this, 'onEvent');
            },

            connect: function (options) {
                _.extend(this.options, options || {});

                this.centrifuge.configure(this.options);
                this.centrifuge.on('all', this.onEvent);
                this.centrifuge.connect();
            },

            onEvent: function (event, params) {
                if(typeof event !== 'undefined') {
                    this.communicator.vent.trigger('ws:' + event, params);
                }
            },

            disconnect: function () {
                this.centrifuge.disconnect();
            },

            subscribe: function (channel) {
                this.subscription = this.centrifuge.subscribe(channel, this.onMessage);
                _.extend(this.subscription, Backbone.Events);
                this.subscription.on('all', this.onEvent);
            },

            unsubscribe: function () {
                this.subscription.unsubscribe();
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
            }

        });

    });
}).call( this );
