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

            options = options || (options = {});
            this.channel = options.channel;
            this.roomModel = options.roomModel;
            this.region = options.region;

            this.roomLayout = new RoomLayout();

            this.nickController = new NickController({
                channel: this.channel,
                region: this.roomLayout.nickRegion,
                nicks: this.roomModel.get('users'),
            });

            this.messageController = new MessageController({
                channel: this.channel,
                region: this.roomLayout.messageRegion,
                messages: this.roomModel.get('messages'),
            });

            communicator.command.execute("ws:subscribe", this.channel);

        },

        showRoom: function () {

            this.region.show(this.roomLayout);
            this.nickController.showNicks();
            this.messageController.showMessages();

        },

        onClose: function () {
            console.log("closing");
            communicator.command.execute("ws:unsubscribe", this.channel);
        },

    });

    return RoomController;
});
