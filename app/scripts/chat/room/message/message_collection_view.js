define([
    'backbone',
    'scripts/chat/room/message/message_item_view'
],
function (Backbone, MessageItemView) {

    var MessageCollectionView = Backbone.Marionette.CollectionView.extend({

        initialize: function() {},

        itemView: MessageItemView,

        ui: {},

        events: {},

        collectionEvents: {},

        onRender: function() {}
    });

    return MessageCollectionView;

});
