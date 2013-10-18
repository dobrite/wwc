define([
    "backbone",
    "scripts/communicator",
    "scripts/ws/websocket_proxy",
    "scripts/chat_config",
],
function (Backbone, communicator, WebsocketProxy, config) {

    var users = WebsocketProxy(communicator, config);

    var API = {
        getUsers: function () {
            //TODO replace with server lookup
            //and remove "module" scope users var
            return users;
        },
        addUser: function (user) {
            users.add(user);
        },
        getSelf: function () {
            //only one
            return users.where({self: true})[0];
        }
    };

    this.communicator.command.setHandler("ws:connect", function (options) {
        this.connect(options);
    }, this);

    this.communicator.command.setHandler("ws:subscribe", function (channel) {
        this.subscribe(channel);
    }, this);

    this.communicator.command.setHandler("ws:publish", function (message) {
        this.publish(message);
    }, this);

    return ;

});
