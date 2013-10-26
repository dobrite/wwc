define([
    'backbone',
    'scripts/communicator',
    'scripts/region_manager',
    'scripts/ws/websocket_proxy',
    'hbs!templates/main_template',
],
function (Backbone, communicator, regionManager, WebsocketProxy, mainTemplate) {
    console.log("application.js");

    var app = new Backbone.Marionette.Application();

    regionManager.addRegions({
        mainPane: "#main",
    });

    app.addInitializer(function () {
        document.body.innerHTML = mainTemplate();
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
