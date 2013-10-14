define([
    'backbone',
    'hbs!templates/room_template',
],
function (Backbone, RoomTemplate) {

    return Backbone.Marionette.Layout.extend({

        template: {
            type: 'handlebars',
            template: RoomTemplate
        },

        regions: {
            messageRegion: "#message-pane",
            nickRegion: "#nick-pane",
        }

    });

});
