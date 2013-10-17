define([
    "backbone",
    "scripts/communicator",
    "scripts/chat/room/nick/nick_collection_view",
    "scripts/entities/user_entities",
],
function (Backbone, communicator, NickCollectionView) {

    var NickController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            var nicks = communicator.reqres.request("entities:users");

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
