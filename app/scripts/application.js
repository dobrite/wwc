(function() {
    'use strict';

    var root = this;

    root.define([
        'socketio',
        'backbone',
        'controllers/boneio',
        'regionManager',
        'communicator',
        'hbs!tmpl/main',
        'models/message',
        'views/item/messageItemView',
    ],

    function( io, Backbone, BoneIO, RegionManager, Communicator, MainTemplate, Message, MessageItemView ) {
        var mainTemplate = MainTemplate;

        var App = new Backbone.Marionette.Application();

        /* Add application regions here */
        RegionManager.addRegions({
            chatPane: "#chat-pane",
            nickPane: "#nick-pane",
            inputPane: '#input-pane'
        });

        /* Add initializers here */
        App.addInitializer( function () {
            document.body.innerHTML = mainTemplate();
            Communicator.vent.trigger("APP:START");
            var boneio = new BoneIO({io: io});
            var message = new Message({nick: 'Nick', text: 'Yo!'});

            var messageItemView = new MessageItemView({model: message});

            RegionManager.getRegion('chatPane').show(messageItemView);
        });

        return App;
    });
}).call( this );
