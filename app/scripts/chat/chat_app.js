define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/ws/websocket_proxy",
    "scripts/chat/chat_layout",
    "scripts/chat/common/channel/channel_controller",
    "scripts/chat/common/input/input_controller",
],
function (Backbone, app, communicator, WebsocketProxy, ChatLayout, ChannelController, InputController) {

    var ChatRouter = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "room/:room" : "showChat"
        }
    });

    var chatLayout = new ChatLayout();

    var channelController = new ChannelController({
        region: chatLayout.channelRegion
    });

    var inputController = new InputController({
        region: chatLayout.inputRegion
    });

    var API = {
        showChatRoom: function (room) {

            /* called to show the room portion
             * of the app, message and nick
             * i.e. to switch between rooms
             */

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
                roomController.showRoom();
                //ContactManager.execute("set:active:header", "about");
            });
        },
        showChat: function (room) {

            /* called to show the chat portion of the app
             * input, channel, and room
             */

            require([
                "scripts/region_manager",
            ],
            function (regionManager, CommonController) {
                regionManager.getRegion('mainPane').show(chatLayout);
                channelController.showChannels(room);
                inputController.showInput();
                communicator.vent.trigger("chat:show:room", room);
            });
        },
    };

    communicator.vent.on("chat:show:room", function (room) {
        communicator.command.execute("router:navigate", "room/" + room, {});
        API.showChatRoom(room);
    });

    communicator.vent.on("chat:show", function () {
        communicator.command.execute("ws:connect");
        communicator.vent.on("ws:connect", function () {
            API.showChat("general");
        });
    });

    communicator.vent.on("login:submit", function () {
        communicator.command.execute("ws:connect");
        communicator.vent.on("ws:connect", function () {
            API.showChat("general");
        });
    });

    app.addInitializer(function(){
        console.log("chat_app initialize");

        new ChatRouter({
            controller: API
        });
    });

    return ChatRouter;
});
