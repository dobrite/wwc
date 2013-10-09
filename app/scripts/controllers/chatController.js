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
                    'scripts/views/item/chatView',
                    'scripts/views/item/nickView',
                    'scripts/views/item/inputView',
                ], function (ChatLayout, ChatItemView, NickItemView, InputItemView) {
                    var chatLayout = new ChatLayout();

                    RegionManager.getRegion('mainPane').show(chatLayout);

                    chatLayout.chatRegion.show(new ChatItemView());
                    chatLayout.nickRegion.show(new NickItemView());
                    chatLayout.inputRegion.show(new InputItemView());
                });
            }

        });

        App.addInitializer(function () {
            console.log("chatController addInitializer");

            var chatController = new ChatController();

            //use this once we get logging in working
            //Communicator.vent.on('chat:show', function () {
            Communicator.vent.on('login:submit', function () {
                chatController.showChat();
            });
        });

        return ChatController;

    });
}).call(this);
