(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/controllers/websocketProxy',
        'scripts/routers/router',
        'scripts/regionManager',
        'scripts/communicator',
        'hbs!templates/main',
    ],
    function (Backbone, WebsocketProxy, Router, RegionManager, Communicator, MainTemplate) {
        console.log("application.js");

        var mainTemplate = MainTemplate;

        var App = new Backbone.Marionette.Application();
        var router = new Router();

        RegionManager.addRegions({
            mainPane: "#main",
        });

        App.addInitializer(function () {
            document.body.innerHTML = mainTemplate();
            Communicator.vent.trigger("app:start");
        });

        App.on("initialize:after", function () {
            console.log("initialize:after");

            if(Backbone.history){
                require([
                    "scripts/controllers/loginController",
                    "scripts/controllers/chatController",
                ], function () {
                    Backbone.history.start();

                    if(router.getCurrentRoute() === ""){
                        console.log("login:show");
                        Communicator.vent.trigger("login:show");
                    }
                });
            }
        });

        return App;
    });
}).call(this);
