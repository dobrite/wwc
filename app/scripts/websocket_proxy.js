define([
    'centrifuge',
    'backbone',
    'underscore',
    'scripts/communicator',
    'sockjs-client'
],
function (Centrifuge, Backbone, _, communicator) {

    var WebsocketProxy = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            this.options = options || (options = {});
            this.namespace = options.namespace;
            this.communicator = options.communicator || communicator;
            this.centrifuge = new Centrifuge();

            _.extend(this.centrifuge, Backbone.Events);
            _.bindAll(this, 'onEvent');

            this.centrifuge.on('all', this.onEvent);

            this.setCommandHandlers();
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

        subscribe: function (channel) {
            var endpoint = this.namespace + ":" + channel;

            //this.onMessage calls a centrifuge method
            this.subscription = this.centrifuge.subscribe(endpoint, this.onMessage);
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

            this.communicator.command.setHandler("ws:connect", function (options) {
                this.connect(options);
            }, this);

            this.communicator.command.setHandler("ws:subscribe", function (channel) {
                this.subscribe(channel);
            }, this);

            this.communicator.command.setHandler("ws:publish", function (message) {
                this.publish(message);
            }, this);

        },

    });

    return WebsocketProxy;

});
