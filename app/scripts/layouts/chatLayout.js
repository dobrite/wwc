(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/communicator',
        'scripts/region_manager',
        'hbs!templates/chat',
    ],
    function( Backbone, Communicator, RegionManager, ChatLayoutTemplate) {

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
