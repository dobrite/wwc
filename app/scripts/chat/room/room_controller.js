define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/main_router",
],
function(Backbone, app, communicator, mainRouter){

    var RoomController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            this.room = options.room;
            //subscribe to room
        },

        showRoom: function () {
            var messageView = new MessageView();
            var nickView = new NickView();

            var roomLayout = new RoomLayout();

            //show layout on region
        },

        onClose: function () {
        },

    });

    return RoomController;
});
