define([
    'backbone',
    'hbs!templates/common_template',
],
function (Backbone, CommonTemplate) {

    return Backbone.Marionette.Layout.extend({

        template: {
            type: 'handlebars',
            template: CommonTemplate
        },

        regions: {
            channelRegion: "#channel-pane",
            inputRegion: "#input-pane",
        }

    });

});
