define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/chat/chat_layout",
    "scripts/chat/common/common_controller",
],
function (Backbone, app, communicator, ChatLayout, CommonController) {

    var ChatRouter = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "room/:room" : "showChat"
        }
    });

    var chatLayout = new ChatLayout();

    var commonController = new CommonController({
        region: chatLayout.commonRegion
    });

    var API = {
        showChatRoom: function (room) {
            require([
                "scripts/chat/room/room_controller",
            ],
            function (RoomController) {
                var roomController = new RoomController({
                    region: chatLayout.roomRegion,
                    room: room
                });

                //TODO do we need this?
                //ContactManager.startSubApp(null);
                //commonController.showCommon();
                roomController.showRoom();
                //ContactManager.execute("set:active:header", "about");
            });
        },
        showChat: function () {
            require([
                "scripts/region_manager",
            ],
            function (regionManager, CommonController) {
                console.log("showChat");
                regionManager.getRegion('mainPane').show(chatLayout);
                commonController.showCommon();
                communicator.vent.trigger("show:chat:room", "general");
            });
        },
    };

    communicator.vent.on("show:chat:room", function (room) {
        communicator.command.execute("mr:navigate", room, {});
        API.showChatRoom(room);
    });

    communicator.vent.on("show:chat", function () {
        console.log("show:chat");
        API.showChat();
    });

    app.addInitializer(function(){
        console.log("chat_app initialize:after");

        new ChatRouter({
            controller: API
        });
    });

    return ChatRouter;
});
