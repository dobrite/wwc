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
                    "scripts/chat/room/room_controller"
                ],
                function(RoomController){
                    //TODO do we need this?
                    //ContactManager.startSubApp(null);
                    //RoomController.showRoom();
                    //ContactManager.execute("set:active:header", "about");
                });
            }
        };

        communicator.vent.on("chat:room", function(room){
            communicator.command.execute("mr:navigate", room, {});
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
