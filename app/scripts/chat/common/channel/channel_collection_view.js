define([
    'backbone',
    'scripts/chat/common/channel/channel_item_view',
    'bootstrap',
],
function (Backbone, ChannelItemView) {

    var ChannelCollectionView = Backbone.Marionette.CollectionView.extend({

        tagName: "ul",
        className: "nav nav-tabs",

        initialize: function() {
            console.log("initialize a ChannelCollectionView");
        },

        itemView: ChannelItemView,

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function() {}
    });

    return ChannelCollectionView;

});
