define([
    'centrifuge',
    'backbone',
    'underscore',
    'jquery',
    'sockjs-client'
],
function (Centrifuge, Backbone, _, $) {

    var WebsocketProxy = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            this.options = options || (options = {});
            this.namespace = options.namespace;
            this.communicator = options.communicator;
            this.centrifuge = new Centrifuge();

            _.extend(this.centrifuge, Backbone.Events);
            _.bindAll(this, 'onEvent');

            this.centrifuge.on('all', this.onEvent);
        },

        connect: function (options) {
            if(!this.centrifuge.isConnected()){
                _.extend(this.options, options || {});
                this.namespace = this.options.namespace;
                this.centrifuge.configure(this.options);
                this.centrifuge.connect();
            }
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

        subscribe: function (options) {
            var namespace = options.namespace || this.namespace;
            var channel = options.channel;
            var endpoint = namespace + ":" + channel;

            this.subscription = this.centrifuge.subscribe(endpoint);
            _.extend(this.subscription, Backbone.Events);
            this.subscription.on('all', this.onEvent);
            console.log(this.subscription);
        },

        unsubscribe: function () {
            this.subscription.unsubscribe();
            this.subscription.off('all');
        },

        publish: function (data) {
            this.subscription.publish(data);
        },

        presence: function () {
            var defer = $.Deferred();

            this.subscription.presence(function (data) {
                defer.resolve(data);
            });

            return defer.promise();
        },

        history: function () {
            var defer = $.Deferred();

            this.subscription.history(function (data) {
                defer.resolve(data);
            });

            return defer.promise();
        },

    });

    return WebsocketProxy;

});