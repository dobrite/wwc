(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/regionManager',
        'scripts/communicator',
        'hbs!templates/chat',
    ],
    function( Backbone, RegionManager, Communicator, ChatLayoutTemplate) {

        return Backbone.Marionette.Layout.extend({

            template: {
                type: 'handlebars',
                template: ChatLayoutTemplate
            },

            regions: {
                messageRegion: "#message-pane",
                nickRegion: "#nick-pane",
                inputRegion: "#input-pane",
            }

        });

    });
}).call(this);
