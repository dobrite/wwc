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

            this.listenTo(
                this.messageCollectionView,
                "after:item:added",
                this.scrollDown
            );

            this.listenTo(
                communicator.vent,
                "chat:show:room",
                function (channel) {
                    if(this.channel === channel){
                        this.scrollDown();
                    }
                }, this
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

    });

    return MessageController;
});
