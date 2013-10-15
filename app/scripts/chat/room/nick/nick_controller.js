define([
    "backbone",
    "scripts/communicator",
    "scripts/models/collection/nick_collection",
    "scripts/chat/room/nick/nick_collection_view",
],
function (Backbone, communicator, NickCollection, NickCollectionView) {

    var NickController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            var nicks = new NickCollection([
                {nick:"Dave"},
                {nick:"Bill"},
            ]);

            this.nickCollectionView = new NickCollectionView({
                collection: nicks
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
