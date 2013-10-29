define([
    "backbone",
    "scripts/communicator",
    "scripts/entities/collection/channel_collection",
    "scripts/chat/common/channel/channel_collection_view",
],
function (Backbone, communicator, ChannelCollection, ChannelCollectionView) {

    var ChannelController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            this.channelCollectionView = new ChannelCollectionView({
                collection: new ChannelCollection()
            });

            //TODO shouldn't we just listen for room collection add events?
            communicator.vent.on("chat:create:room", function (room) {
                this.channelCollectionView.collection.add({channel: room});
            }, this);

            this.listenTo(this.channelCollectionView, 'itemview:change', function (event, view) {
                communicator.vent.trigger('chat:show:room', view.model.get('channel'));
            });
        },

        showChannels: function () {
            this.region.show(this.channelCollectionView);
        },

        onClose: function () {
        },

    });

    return ChannelController;
});
