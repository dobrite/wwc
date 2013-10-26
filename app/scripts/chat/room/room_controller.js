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
            this.roomModel = options.roomModel;
            this.region = options.region;

            this.roomLayout = new RoomLayout();

            this.nickController = new NickController({
                region: this.roomLayout.nickRegion,
                nicks: this.roomModel.get('users'),
            });

            //this.messageController = new MessageController({
            //    region: this.roomLayout.messageRegion
            //});

        },

        showRoom: function () {

            this.region.show(this.roomLayout);
            this.nickController.showNicks();
            //this.messageController.showMessages();

        },

        onClose: function () {
        },

    });

    return RoomController;
});
