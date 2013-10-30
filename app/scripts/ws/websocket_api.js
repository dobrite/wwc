define([
    "backbone",
    "underscore",
    "scripts/communicator",
    "scripts/ws/websocket_proxy",
    "scripts/chat_config", //XXX maybe not the best place for this
],
function (Backbone, _, communicator, WebsocketProxy, config) {

    var wsConfig = _.extend({communicator: communicator}, config);
    var ws = new WebsocketProxy(wsConfig);

    communicator.command.setHandler("ws:connect", function (options) {
        ws.connect(options);
    });

    communicator.command.setHandler("ws:subscribe", function (channel) {
        ws.subscribe(channel);
    });

    communicator.command.setHandler("ws:publish", function (message) {
        ws.publish(message);
    });

    communicator.command.setHandler("ws:presence", function (room, func) {
        ws.presence(room, func);
    });

    communicator.command.setHandler("ws:history", function (room, func) {
        ws.history(room, func);
    });

    return ;

});
