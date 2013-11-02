define([
    'backbone',
    'scripts/communicator',
    'scripts/region_manager',
    'scripts/ws/websocket_proxy',
],
function (Backbone, communicator, regionManager, WebsocketProxy) {
    console.log("application.js");

    var app = new Backbone.Marionette.Application();

    regionManager.addRegions({
        mainPane: "#main",
    });

    app.on('start', function (event, blah) {
        communicator.vent.trigger("start");
    });

    app.on("initialize:after", function () {
        require([
            "scripts/ws/websocket_api",
            "scripts/chat/chat_app",
            "scripts/login/login_app",
            "scripts/entities/room_entities",
        ],
        function () {
            communicator.command.execute("router:history:start");

            if(communicator.reqres.request("router:route") === ""){
                communicator.vent.trigger("login:show");
            }

        });
    });

    return app;
});
