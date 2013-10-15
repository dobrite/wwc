define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/websocket_proxy",
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
            require([
                "scripts/region_manager",
            ],
            function (regionManager, CommonController) {
                regionManager.getRegion('mainPane').show(chatLayout);
                channelController.showChannels();
                inputController.showInput();
                communicator.vent.trigger("show:chat:room", room);
            });
        },
    };

    communicator.vent.on("show:chat:room", function (room) {
        communicator.command.execute("router:navigate", "room/" + room, {});
        communicator.command.execute("ws:subscribe", room);
        communicator.vent.on("ws:subscribe:success", function () {
            API.showChatRoom(room);
        });
    });

    communicator.vent.on("show:chat", function (room) {
        communicator.command.execute("ws:connect");
        communicator.vent.on("ws:connect", function () {
            API.showChat(room);
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
