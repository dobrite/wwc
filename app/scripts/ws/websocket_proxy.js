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

        onEvent: function (event, params) {
            this.communicator.vent.trigger('ws:' + event, params[0]);
        },

        disconnect: function () {
            this.centrifuge.disconnect();
            this.centrifuge.on('disconnect', function () {
                this.centrifuge.off('all');
            }, this);
        },

        subscribe: function (options) {
            var namespace = options.namespace || this.namespace;
            var channel = options.channel;
            var endpoint = namespace + ":" + channel;

            this.subscription[endpoint] = this.centrifuge.subscribe(endpoint);
            _.extend(this.subscription[endpoint], Backbone.Events);
            this.subscription[endpoint].on('all', this.onEvent);
        },

        unsubscribe: function () {
            //TODO does this work? we need to pass this in
            var namespace = options.namespace || this.namespace;
            var channel = options.channel;
            var endpoint = namespace + ":" + channel;

            this.subscription[endpoint].unsubscribe();
            this.subscription[endpoint].off('all');
        },

        publish: function (options) {
            //TODO refactor all these
            var namespace = options.namespace || this.namespace;
            var channel = options.channel;
            var endpoint = namespace + ":" + channel;

            this.subscription[endpoint].publish(options.message);
        },

        presence: function (channel, func) {
            //TODO refactor all these
            var endpoint = this.namespace + ":" + channel;

            this.subscription[endpoint].presence(function (data) {
                func(data[0].data); //rec an array of one
            });
        },

        history: function (channel, func) {
            //TODO refactor all these
            var endpoint = this.namespace + ":" + channel;

            this.subscription[endpoint].history(function (data) {
                func(data[0].data); //rec an array of one
            });
        },

    });

    return WebsocketProxy;

});
