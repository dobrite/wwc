define([
    "backbone",
    "scripts/communicator",
    "scripts/models/collection/channel_collection",
    "scripts/chat/common/channel/channel_collection_view",
],
function (Backbone, communicator, ChannelCollection, ChannelCollectionView) {

    var ChannelController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            var channels = new ChannelCollection([{channel: "channel"}]);
            this.channelCollectionView = new ChannelCollectionView({
                collection: channels
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
