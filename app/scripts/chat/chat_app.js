define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/chat/chat_layout",
    "scripts/chat/common/channel/channel_controller",
    "scripts/chat/common/input/input_controller",
    "scripts/chat/room/room_controller",
    "scripts/entities/relation/room_relation",
    "scripts/region_manager",
],
function (
    Backbone,
    app,
    communicator,
    ChatLayout,
    ChannelController,
    InputController,
    RoomController,
    RoomRelationalModel,
    regionManager
) {

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

    var roomControllers = {};

    var API = {
        createChatRoom: function (room) {

            /* called to create a room
             */

            var roomRelationalModel = communicator.reqres.request('entities:room:add', room);

            roomControllers[room] = new RoomController({
                region: chatLayout.roomRegion,
                roomModel: roomRelationalModel,
            });

        },
        showChatRoom: function (room) {

            /* called to show a specific room
             * i.e. to switch between rooms
             */

            console.log("showing room: " + room);
            roomControllers[room].showRoom();

        },
        showChat: function () {

            /* called to show the chat portion of the app
             * input, channel, and room
             */

            console.log("showing chat");
            regionManager.getRegion('mainPane').show(chatLayout);
            channelController.showChannels();
            inputController.showInput();
        },
    };

    communicator.vent.on("chat:show:room", function (room) {
        communicator.command.execute("router:navigate", "room/" + room, {});
        API.showChatRoom(room);
    });

    communicator.vent.on("chat:show", function () {
        //TODO show last active chatroom
    });

    communicator.vent.on("login:submit", function (room) {
        communicator.command.execute("ws:connect");
        communicator.vent.on("ws:connect", function () {
            API.createChatRoom(room);
            API.showChat();
            communicator.vent.trigger("chat:show:room", room);
        });
    });

    //TODO can I replace this with a communicator method? 'start' or w/e
    app.addInitializer(function(){
        console.log("chat_app initialize");

        new ChatRouter({
            controller: API
        });
    });

    return ChatRouter;
});
