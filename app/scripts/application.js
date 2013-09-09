(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'controllers/centrifuge',
        'regionManager',
        'communicator',
        'hbs!tmpl/main',
        'models/message',
        'views/item/messageItemView',
    ],
    function( Backbone, Centrifuge, RegionManager, Communicator, MainTemplate, Message, MessageItemView ) {
        console.log("application.js");

        var mainTemplate = MainTemplate;

        var App = new Backbone.Marionette.Application();

        /* Add application regions here */
        RegionManager.addRegions({
            mainPane: "#main",
        });

        /* Add initializers here */
        App.addInitializer( function () {
            document.body.innerHTML = mainTemplate();
            Communicator.vent.trigger("app:start");
            //var boneio = new BoneIO();

            //var message = new Message({nick: 'Nick', text: 'Yo!'});
            //var messages = new MessagesCollectionView();

            //var messageItemView = new MessageItemView({model: message});

            //RegionManager.getRegion('mainPane').show();
        });

        App.on("initialize:after", function() {
            console.log("initialize:after");
        });

        return App;
    });
}).call( this );
