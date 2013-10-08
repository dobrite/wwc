(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/regionManager',
        'scripts/communicator',
        'scripts/layouts/chatLayout',
    ],
    function( Backbone, RegionManager, Communicator, ChatLayout ) {

        return Backbone.Marionette.Controller.extend({

            initialize: function( options ) {
                console.log("initialize a Chat Controller");
            },

            showChat: function () {
                var chatItemView = new ChatItemView();
                var nickItemView = new NickItemView();
                var inputItemView = new InputItemView();

                var chatLayout = new ChatLayout();

                RegionManager.getRegion('mainPane').show(chatItemView);
            },

        });

    });
}).call(this);
