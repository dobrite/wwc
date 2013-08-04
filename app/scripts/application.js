(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'boneio',
        'regionManager',
        'communicator',
        'hbs!tmpl/main'
    ],

    function( Backbone, BoneIO, RegionManager, Communicator, MainTemplate ) {
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
            Communicator.mediator.trigger("APP:START");
        });

        return App;
    });
}).call( this );
