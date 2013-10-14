define([
    'backbone',
    'scripts/communicator',
    'scripts/region_manager',
    'hbs!templates/chat_template',
],
function (Backbone, Communicator, RegionManager, ChatTemplate) {

    return Backbone.Marionette.Layout.extend({

        template: {
            type: 'handlebars',
            template: ChatTemplate
        },

        regions: {
            roomRegion: "#room-pane",
            commonRegion: "#common-pane",
        }

    });

});
