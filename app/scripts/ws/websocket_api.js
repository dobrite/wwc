define([
    "backbone",
    "underscore",
    "scripts/communicator",
    "scripts/ws/websocket_proxy",
    "scripts/chat_config",
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

    communicator.reqres.setHandler("ws:presence", function () {
        return ws.presence();
    });

    communicator.reqres.setHandler("ws:history", function () {
        return ws.history();
    });

    return ;

});
