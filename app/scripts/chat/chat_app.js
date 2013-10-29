define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/chat/chat_layout",
    "scripts/chat/common/channel/channel_controller",
    "scripts/chat/common/input/input_controller",
    "scripts/chat/room/room_controller",
    "scripts/entities/model/room_model",
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
    RoomModel,
    regionManager
) {

    var ChatRouter = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "room/:room" : "showChatRoom"
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

    var createChatRoom = function (room) {

        /* called to create a room
        */

        var roomModel = communicator.reqres.request('entities:room:add', room);

        roomControllers[room] = new RoomController({
            region: chatLayout.roomRegion,
            roomModel: roomModel,
        });

        communicator.vent.trigger("chat:create:room", room);

    };

    var API = {
        showChatRoom: function (room) {

            /* called to show a specific room
             * i.e. to switch between rooms
             */

            if(!roomControllers.hasOwnProperty(room)){
                createChatRoom(room);
            }

            roomControllers[room].showRoom();

        },
        showChat: function () {

            /* called to show the chat portion of the app
             * input, channel, and room
             */

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
