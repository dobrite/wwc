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

            this.nicks.on("all", function (event) {
                console.log(event);
            });

            this.nickCollectionView = new NickCollectionView({
                collection: this.nicks,
            });
        },

        showNicks: function () {
            console.log("showing nicks");
            this.region.show(this.nickCollectionView);
        },

        onClose: function () {
        },

    });

    return NickController;
});
