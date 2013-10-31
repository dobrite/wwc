define([
    'backbone',
    'scripts/chat/room/nick/nick_item_view'
],
function (Backbone, NickItemView) {

    var NickCollectionView = Backbone.Marionette.CollectionView.extend({

        initialize: function() {},

        itemView: NickItemView,

        ui: {},

        events: {},

        onRender: function() {}

    });

    return NickCollectionView;

});
