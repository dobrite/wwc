define([
    'backbone',
    'scripts/communicator',
    'scripts/region_manager',
    'hbs!templates/main_template',
],
function (Backbone, communicator, regionManager, mainTemplate) {
    console.log("application.js");

    var app = new Backbone.Marionette.Application();

    regionManager.addRegions({
        mainPane: "#main",
    });

    app.addInitializer(function () {
        document.body.innerHTML = mainTemplate();
        communicator.vent.trigger("app:starting");
    });

    app.on("initialize:after", function () {
        console.log("initialize:after");
    });

    app.on("start", function () {
        console.log("app:start");
        communicator.vent.trigger("app:start");

        require([
            "scripts/chat/chat_app",
        ], function () {

            if(communicator.reqres.request("mr:route") === ""){
                console.log("triggering chat:room");
                communicator.vent.trigger("show:chat");
            }

        });
    });

    return app;
});
