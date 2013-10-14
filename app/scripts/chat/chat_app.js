define([
        "backbone",
        "scripts/application",
        "scripts/communicator",
        "scripts/main_router",
    ],
    function(Backbone, app, communicator, mainRouter){

        var ChatRouter = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                "room/:room" : "showRoom"
            }
        });

        var API = {
            showRoom: function(room){
                require([
                    "scripts/region_manager",
                    "scripts/chat/common/common_controller",
                    "scripts/chat/room/room_controller",
                    "scripts/chat/chat_layout"
                ],
                function (regionManager, CommonController, RoomController, ChatLayout) {
                    console.log("show room");
                    var chatLayout = new ChatLayout();

                    regionManager.getRegion('mainPane').show(chatLayout);

                    //var commonController = new CommonController();

                    console.log("new RoomController");
                    var roomController = new RoomController({
                        region: chatLayout.roomRegion,
                        room: room
                    });


                    //TODO do we need this?
                    //ContactManager.startSubApp(null);
                    //commonController.showCommon();
                    console.log("showing room");
                    roomController.showRoom();
                    //ContactManager.execute("set:active:header", "about");
                });
            }
        };

        communicator.vent.on("chat:room", function(room){
            console.log("chat:room");
            //TODO uncomment
            //communicator.command.execute("mr:navigate", room, {});
            API.showRoom(room);
        });

        app.addInitializer(function(){
            console.log("chat_app initialize:after");

            new ChatRouter({
                controller: API
            });
        });

        return ChatRouter;
});
