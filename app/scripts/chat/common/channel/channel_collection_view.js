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

            this.on("itemview:click", this.onTabClick);
        },

        itemView: ChannelItemView,

        ui: {},

        events: {},

        onTabClick: function (view) {
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onRender: function() {},

    });

    return ChannelCollectionView;

});
