define([
    'backbone',
    'scripts/communicator',
    'scripts/region_manager',
    'scripts/websocket_proxy',
    'hbs!templates/main_template',
],
function (Backbone, communicator, regionManager, WebsocketProxy, mainTemplate) {
    console.log("application.js");

    var app = new Backbone.Marionette.Application();

    regionManager.addRegions({
        mainPane: "#main",
    });

    var wsOptions = {
        namespace: 'test',
        url: 'http://localhost:8000/connection',
        token: '15f928437b0fa1fdd58921f19c854f29',
        project: '52522b73a4dd5f27c53999d6',
        user: '2694',
        debug: true
    };

    var websocketProxy = new WebsocketProxy(wsOptions);

    app.addInitializer(function () {
        document.body.innerHTML = mainTemplate();
    });

    app.on("initialize:after", function () {
        require(["scripts/chat/chat_app"], function () {
            communicator.command.execute("router:history:start");

            if(communicator.reqres.request("router:route") === ""){
                communicator.vent.trigger("show:chat", "general");
            }

        });
    });

    return app;
});
