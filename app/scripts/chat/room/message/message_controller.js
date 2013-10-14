define([
    "backbone",
    "scripts/communicator",
    "scripts/models/collection/message_collection",
    "scripts/chat/room/message/message_collection_view",
],
function (Backbone, communicator, MessageCollection, MessageCollectionView) {

    var MessageController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            var messages = new MessageCollection([{nick: 'Nick', text: "Yo!"}]);
            this.messageCollectionView = new MessageCollectionView({
                collection: messages
            });

            //subscribe to room
        },

        showMessages: function () {
            this.region.show(this.messageCollectionView);
        },

        onClose: function () {
        },

    });

    return MessageController;
});
