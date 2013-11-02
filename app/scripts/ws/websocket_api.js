/*
 * Insulates main app from websocket implementation
 * by translating websocket events into normalized app
 * events.
 */

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

    /*
     * To server
     */

    communicator.command.setHandler("ws:connect", function (options) {
        if(!ws.connected()){
            ws.connect(options);
        }else{
            communicator.vent.trigger("ws:connected");
        }
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

    /*
     * From server
     */

    communicator.vent.on("ws:subscribe:success", function (subscribe) {
        var channel = subscribe.params.channel;
        communicator.vent.trigger(channel + ":subscribe");

        communicator.command.execute("ws:presence", channel, function (presence) {
            var values = _.values(presence);
            var users = _.map(values, function (user) {
                 return {
                     id: user.client_id,
                     nick: user.user_id,
                 };
            });
            communicator.vent.trigger(channel + ":presence", users);
        });


        communicator.command.execute("ws:history", channel, function (history) {
            var values = _.values(history);
            var normalized = _.map(values, normalize);
            communicator.vent.trigger(channel + ":history", normalized);
        });

    });

    communicator.vent.on("ws:message", function (message) {
        var normalized = normalize(message);
        communicator.vent.trigger(normalized.channel + ":message", normalized);
    });

    communicator.vent.on("ws:join", function (message) {
        var id = message.data.client_id;
        var channel = message.channel;
        var nick = message.data.user_id;
        var type = message.message_type;
        var text = nick + " has joined " + channel + ".";

        var normalized = {
            id: id, //id of joining user
            channel: channel,
            nick: nick,
            type: type,
            text: text,
        };

        communicator.vent.trigger(channel + ":join", normalized);
    });

    communicator.vent.on("ws:leave", function (message) {
        var id = message.data.client_id;
        var channel = message.channel;
        var nick = message.data.user_id;
        var type = message.message_type;
        var text = nick + " has left " + channel + ".";

        var normalized = {
            id: id, //id of leaving user
            channel: channel,
            nick: nick,
            type: type,
            text: text,
        };

        communicator.vent.trigger(channel + ":leave", normalized);
    });

    var normalize = function (message) {
        var id = message.uid;
        var channel = message.channel;
        var nick = message.client.user_id;
        var type = message.message_type;
        var text = message.data;

        var normalized = {
            id: id,
            channel: channel,
            nick: nick,
            type: type,
            text: text,
        };

        return normalized;

    };

    return ;

});
