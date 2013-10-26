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
                collection: new ChannelCollection([
                    //{channel: "blah"},
                    //{channel: "python"},
                ])
            });
        },

        showChannels: function () {
            this.region.show(this.channelCollectionView);
            //move somewhere else
            //this.channelCollectionView.collection.add({channel: room});
        },

        onClose: function () {
        },

    });

    return ChannelController;
});
