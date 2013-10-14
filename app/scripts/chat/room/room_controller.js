define([
    "backbone",
    "scripts/communicator",
    "scripts/chat/room/room_layout",
    "scripts/chat/room/nick/nick_controller",
    "scripts/chat/room/message/message_controller",
],
function (Backbone, communicator, RoomLayout, NickController, MessageController) {

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

                //subscribe to room
        },

        showRoom: function () {
            this.region.show(this.roomLayout);
            this.messageController.showMessages();
            this.nickController.showNicks();
            //delegate to nick and message view
            //
            //this.roomLayout.messageRegion.show(messageView);
            //this.roomLayout.nickRegion.show(nickView);
        },

        onClose: function () {
        },

    });

    return RoomController;
});
