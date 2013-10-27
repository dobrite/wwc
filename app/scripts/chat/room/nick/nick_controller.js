define([
    "backbone",
    "scripts/communicator",
    "scripts/chat/room/nick/nick_collection_view",
],
function (Backbone, communicator, NickCollectionView) {

    var NickController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;
            this.nicks = options.nicks;

            this.nickCollectionView = new NickCollectionView({
                collection: this.nicks,
            });
        },

        showNicks: function () {
            this.region.show(this.nickCollectionView);
        },

        onClose: function () {
        },

    });

    return NickController;
});
