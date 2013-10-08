(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/regionManager',
        'scripts/communicator',
    ],
    function( Backbone, RegionManager, Communicator ) {

        return Backbone.Marionette.Layout.extend({

            template: {
                type: 'handlebars',
                template: ChatLayoutTmpl
            },

            regions: {
                chat: "#chat-pane",
                nick: "#nick-pane",
                input: "#input-pane",
            }

        });

    });
}).call(this);
