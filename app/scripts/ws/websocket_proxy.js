define([
    'centrifuge',
    'backbone',
    'underscore',
    'jquery',
    'sockjs-client'
],
function (Centrifuge, Backbone, _, $, B) {

    var WebsocketProxy = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            this.options = options || (options = {});
            this.namespace = options.namespace;
            this.communicator = options.communicator;
            this.centrifuge = new Centrifuge();
            this.subscription = {};

            _.extend(this.centrifuge, Backbone.Events);
            _.bindAll(this, 'onEvent');

            this.centrifuge.on('all', this.onEvent);
        },

        connect: function (options) {
            _.extend(this.options, options || {});
            this.namespace = this.options.namespace;
            this.centrifuge.configure(this.options);
            this.centrifuge.connect();
        },

        connected: function () {
            return this.centrifuge.isConnected();
        },

        disconnect: function () {
            this.centrifuge.disconnect();
            this.centrifuge.on('disconnect', function () {
                this.centrifuge.off('all');
            }, this);
        },

        onEvent: function (event, params) {
            this.communicator.vent.trigger('ws:' + event, params[0]);
        },

        subscribe: function (channel, options) {
            var options = options || (options = {});
            var namespace = options.namespace || this.namespace;
            var endpoint = namespace + ":" + channel;

            this.subscription[endpoint] = this.centrifuge.subscribe(endpoint);
            _.extend(this.subscription[endpoint], Backbone.Events);
            this.subscription[endpoint].on('all', this.onEvent);
        },

        unsubscribe: function (channel, options) {
            var options = options || (options = {});
            var namespace = options.namespace || this.namespace;
            var endpoint = namespace + ":" + channel;

            this.subscription[endpoint].unsubscribe();
            this.subscription[endpoint].off('all');
        },

        publish: function (channel, message, options) {
            var options = options || (options = {});
            var namespace = options.namespace || this.namespace;
            var endpoint = namespace + ":" + channel;

            this.subscription[endpoint].publish(message);
        },

        presence: function (channel, func) {
            var endpoint = this.namespace + ":" + channel;

            this.subscription[endpoint].presence(function (data) {
                func(data[0].data); //rec an array of one
            });
        },

        history: function (channel, func) {
            var endpoint = this.namespace + ":" + channel;

            this.subscription[endpoint].history(function (data) {
                func(data[0].data); //rec an array of one
            });
        },

    });

    return WebsocketProxy;

});
