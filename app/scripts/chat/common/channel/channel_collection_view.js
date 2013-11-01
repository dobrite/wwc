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
            //TODO should these go in controller?
            //TODO don't do this if tab clicked is already active tab
            //TODO refactor duplicate function
            //TODO refactor duplicate comment
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onTabRemove: function (view) {
            //TODO should these go in controller?
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onAfterItemAdded: function(view){
            //TODO should these go in controller?
            //TODO refactor duplicate function
            //TODO refactor duplicate comment
            this.$el.children().removeClass("active");
            view.$el.addClass("active");
        },

        onRender: function() {},

    });

    return ChannelCollectionView;

});
