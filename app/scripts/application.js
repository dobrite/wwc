define([
    'backbone',
    'scripts/communicator',
    'scripts/region_manager',
    'scripts/ws/websocket_proxy',
    'scripts/list_globals',
],
function (Backbone, communicator, regionManager, WebsocketProxy, listGlobals) {

    console.log(listGlobals());

    var app = new Backbone.Marionette.Application();

    regionManager.addRegions({
        mainPane: "#main",
    });

    app.on('start', function (event, blah) {
        communicator.vent.trigger("start");
    });

    app.on("initialize:after", function () {
        require([
            "scripts/chat_config",
            "scripts/ws/websocket_api",
            "scripts/chat/chat_app",
            "scripts/login/login_app",
            "scripts/entities/room_entities",
        ],
        function (config) {
            communicator.command.execute("router:history:start");

            if(communicator.reqres.request("router:route") === ""){
                communicator.vent.trigger("login:show", config.user);
            }

        });
    });

    return app;
});
