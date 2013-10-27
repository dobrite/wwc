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
        },

        itemView: ChannelItemView,

        ui: {},

        events: {},

        onTabChange: function (view) {
            //TODO don't do this if tab clicked is already active tab
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onAfterItemAdded: function(view){
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onRender: function() {},

    });

    return ChannelCollectionView;

});
