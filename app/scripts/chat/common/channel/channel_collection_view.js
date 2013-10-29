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
            //TODO refactor duplicate function
            //TODO refactor duplicate comment
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onAfterItemAdded: function(view){
            //TODO refactor duplicate function
            //TODO refactor duplicate comment
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onRender: function() {},

    });

    return ChannelCollectionView;

});
