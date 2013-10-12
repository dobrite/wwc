define([
    'backbone',
    'scripts/communicator',
    'scripts/main_router',
    'scripts/region_manager',
    'hbs!templates/main',
],
function (Backbone, communicator, mainRouter, regionManager, mainTemplate) {
    console.log("application.js");

    var app = new Backbone.Marionette.Application();

    regionManager.addRegions({
        mainPane: "#main",
    });

    app.addInitializer(function () {
        document.body.innerHTML = mainTemplate();
        communicator.vent.trigger("app:start");
    });

    app.on("initialize:after", function () {
        console.log("initialize:after");

        if(Backbone.history){
            require([
                "scripts/chat/chat_app",
            ], function () {
                Backbone.history.start();

                if(mainRouter.getCurrentRoute() === ""){
                    console.log("login:show");
                    communicator.vent.trigger("chat:room", "general");
                }
            });
        }
    });

    return app;
});
