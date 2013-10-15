define([
    'backbone',
    'scripts/chat/room/message/message_item_view'
],
function (Backbone, MessageItemView) {

    var MessageCollectionView = Backbone.Marionette.CollectionView.extend({

        initialize: function() {
            console.log("initialize a MessageCollectionView");
        },

        itemView: MessageItemView,

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        collectionEvents: {
        },

        /* on render callback */
        onRender: function() {}
    });

    return MessageCollectionView;

});
