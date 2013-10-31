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
            this.channel = options.channel;
            this.region = options.region;
            this.messages = options.messages;

            this.messageCollectionView = new MessageCollectionView({
                collection: this.messages
            });

            this.listenTo(this.messages, "add", this.scrollDown);

            this.listenTo(
                communicator.vent,
                this.channel + ":message",
                this.addMessage
            );

            //TODO this is funky
            //all message controllers will do this
            this.listenTo(
                communicator.vent,
                "chat:show:room",
                this.scrollDown
            );

        },

        showMessages: function () {
            this.region.reset();
            this.region.show(this.messageCollectionView);
        },

        scrollDown: function () {
            var $el = this.region.$el[0];
            $el.scrollTop = $el.scrollHeight;
        },

        addMessage: function (message) {
            this.messages.add(message);
        },

        onClose: function () {},

    });

    return MessageController;
});
