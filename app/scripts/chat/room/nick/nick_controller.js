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

            //var users = communicator.reqres.request("entities:users:get");

            //this.nickCollectionView = new NickCollectionView({
            //    collection: users
            //});
        },

        showNicks: function () {
            this.region.show(this.nickCollectionView);
        },

        onClose: function () {
        },

    });

    return NickController;
});
