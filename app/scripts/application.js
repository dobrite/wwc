(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'app/scripts/controllers/websocketProxy',
        'app/scripts/routers/router',
        'app/scripts/regionManager',
        'app/scripts/communicator',
        'hbs!tmpl/main',
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
            //var message = new Message({nick: 'Nick', text: 'Yo!'});
            //var messages = new MessagesCollectionView();

            //var messageItemView = new MessageItemView({model: message});

            //RegionManager.getRegion('mainPane').show(messageItemView);
        });

        App.on("initialize:after", function () {
            console.log("initialize:after");

            if(Backbone.history){
                require(["app/scripts/controllers/loginController"], function () {
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
