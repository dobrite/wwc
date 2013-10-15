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
            channelRegion: "#channel-pane",
            roomRegion: "#room-pane",
            inputRegion: "#input-pane",
        }

    });

});
