define([
    "backbone",
    "scripts/communicator",
    "scripts/chat/common/channel/channel_collection_view",
],
function (Backbone, communicator, ChannelCollectionView) {

    var ChannelController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            var channelCollection = new Backbone.Collection({
                model: Backbone.Model
            });

            this.channelCollectionView = new ChannelCollectionView({
                collection: channelCollection
            });

            communicator.vent.on("chat:create:room", function () {
                var rooms = communicator.reqres.request("entities:room:list");
                channelCollection.reset(this.inflate(rooms));
            }, this);

            communicator.vent.on("chat:destroy:room", function () {
                var rooms = communicator.reqres.request("entities:room:list");
                channelCollection.reset(this.inflate(rooms));
            }, this);

            this.listenTo(
                this.channelCollectionView,
                'itemview:change',
                function (event, view) {
                    communicator.command.execute(
                        'chat:show:room',
                        view.model.get('channel')
                    );
                }
            );

            this.listenTo(
                this.channelCollectionView,
                'itemview:remove',
                function (event, view) {
                    communicator.command.execute(
                        'chat:destroy:room',
                        view.model.get('channel')
                    );
                }
            );
        },

        showChannels: function () {
            this.region.show(this.channelCollectionView);
        },

        inflate: function (rooms) {
            return _.map(rooms, function (room) {
                return {channel: room};
            });
        },

        onClose: function () {
        },

    });

    return ChannelController;
});
