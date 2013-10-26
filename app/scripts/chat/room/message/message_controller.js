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

            var messages = new MessageCollection();

            this.messageCollectionView = new MessageCollectionView({
                collection: messages
            });

            //this.self = communicator.reqres.request("entities:user:self");

            communicator.vent.on("ws:message", function (message) {
                console.log(message);
                //var nick = this.self.get('nick');
                //messages.add({nick: nick, text: message[0].data});
            }, this);
        },

        showMessages: function () {
            this.region.show(this.messageCollectionView);
        },

        onClose: function () {
        },

    });

    return MessageController;
});
