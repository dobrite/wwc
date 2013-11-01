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
            this.on("itemview:change", this.onTabChange);
            this.on("itemview:remove", this.onTabRemove);
        },

        itemView: ChannelItemView,

        ui: {},

        events: {},

        onTabChange: function (view) {
            this.highlightActive(view);
        },

        onTabRemove: function (view) {
            this.highlightActive(view);
        },

        onAfterItemAdded: function (view){
            this.highlightActive(view);
        },

        highlightActive: function (view) {
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onRender: function() {},

    });

    return ChannelCollectionView;

});
