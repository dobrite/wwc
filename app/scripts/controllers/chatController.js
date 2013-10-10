(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/application',
        'scripts/regionManager',
        'scripts/communicator',
    ],
    function( Backbone, App, RegionManager, Communicator) {

        var ChatController = Backbone.Marionette.Controller.extend({

            initialize: function( options ) {
                console.log("initialize a Chat Controller");
            },

            showChat: function () {
                require([
                    'scripts/layouts/chatLayout',
                    'scripts/views/collection/messagesCollectionView',
                    'scripts/models/collection/messageCollection',
                    'scripts/views/item/nickView',
                    'scripts/views/item/inputView',
                ], function (ChatLayout, MessagesCollectionView, MessageCollection, NickItemView, InputItemView) {

                    var message = new MessageCollection([{nick: 'Nick', text: "Yo!"}]);
                    var messages = new MessagesCollectionView({collection: message});

                    var chatLayout = new ChatLayout();

                    RegionManager.getRegion('mainPane').show(chatLayout);

                    chatLayout.messageRegion.show(messages);
                    chatLayout.nickRegion.show(new NickItemView());
                    chatLayout.inputRegion.show(new InputItemView());
                });
            },

            connect: function() {
                console.log("connecting");
                Communicator.command.execute("ws:connect", {});
            },

        });

        App.addInitializer(function () {
            console.log("chatController addInitializer");

            var chatController = new ChatController();

            //use this once we get logging in working
            //Communicator.vent.on('chat:show', function () {
            Communicator.vent.on('login:submit', function () {
                chatController.showChat();
                chatController.connect();
            });
        });

        return ChatController;

    });
}).call(this);
