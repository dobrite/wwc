define([
    'backbone',
    'scripts/chat/room/message/message_item_view'
],
function (Backbone, MessageItemView) {

    var MessageCollectionView = Backbone.Marionette.CollectionView.extend({

        initialize: function() {
            this.listenTo(this.collection, 'sort', function (data) {
                this.render();
            }, this);
        },

        itemView: MessageItemView,

        ui: {},

        events: {},

        collectionEvents: {},

        onRender: function() {},

    });

    return MessageCollectionView;

});
