(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'controllers/boneio',
        'regionManager',
        'communicator',
        'hbs!tmpl/main',
        'models/message',
        'views/item/messageItemView',
    ],
    function( Backbone, BoneIO, RegionManager, Communicator, MainTemplate, Message, MessageItemView ) {
        var mainTemplate = MainTemplate;

        var App = new Backbone.Marionette.Application();

        /* Add application regions here */
        RegionManager.addRegions({
            mainPane: "#main",
        });

        /* Add initializers here */
        App.addInitializer( function () {
            document.body.innerHTML = mainTemplate();
            Communicator.vent.trigger("APP:START");
            //var boneio = new BoneIO();

            //var message = new Message({nick: 'Nick', text: 'Yo!'});
            //var messages = new MesagesCollectionView();

            //var messageItemView = new MessageItemView({model: message});

            //RegionManager.getRegion('mainPane').show();
        });

        App.on("initialize:after", function() {
            console.log("initialize:after");
        });

        return App;
    });
}).call( this );
