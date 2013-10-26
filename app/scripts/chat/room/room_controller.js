define([
    "backbone",
    "jquery",
    "scripts/communicator",
    "scripts/chat/room/room_layout",
    "scripts/chat/room/nick/nick_controller",
    "scripts/chat/room/message/message_controller",
],
function (Backbone, $, communicator, RoomLayout, NickController, MessageController) {

    var RoomController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            console.log("initializing a new RoomController");

            options = options || (options = {});
            this.room = options.room;
            this.region = options.region;

            this.roomLayout = new RoomLayout();

            this.nickController = new NickController({
                region: this.roomLayout.nickRegion
            });

            this.messageController = new MessageController({
                region: this.roomLayout.messageRegion
            });

            communicator.command.execute("ws:subscribe", {channel: this.room.get('name')});

        },

        showRoom: function () {

            this.region.show(this.roomLayout);
            this.messageController.showMessages();
            this.nickController.showNicks();
            var presence_promise = communicator.reqres.request("ws:presence", function () {});

            $.when(presence_promise).done(function (data) {
                console.log(data);
            });

            var history_promise = communicator.reqres.request("ws:history");

            $.when(history_promise).done(function (data) {
                console.log(data);
            });

        },

        onClose: function () {
        },

    });

    return RoomController;
});
