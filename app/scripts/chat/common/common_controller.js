define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/main_router",
    "scripts/chat/common/common_layout",
],
function(Backbone, app, communicator, mainRouter, CommonLayout){

    var CommonController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
        },

        showCommon: function () {
            //TODO fix with common specific stuff
            //var roomLayout = new RoomLayout();

            //roomLayout.messageRegion.show(messageView);
            //roomLayout.nickRegion.show(nickView);
        },

        onClose: function () {
        },

    });

    return CommonController;
});
