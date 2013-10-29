define([
    "backbone",
    "scripts/communicator",
    "scripts/entities/collection/message_collection",
    "scripts/chat/room/message/message_collection_view",
],
function (Backbone, communicator, MessageCollection, MessageCollectionView) {

    var MessageController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;
            this.messages = options.messages;

            this.messageCollectionView = new MessageCollectionView({
                collection: this.messages
            });
        },

        showMessages: function () {
            this.region.reset();
            this.region.show(this.messageCollectionView);
        },

        onClose: function () {
            console.log("close");
        },

    });

    return MessageController;
});
