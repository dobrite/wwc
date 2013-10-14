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
