define([
    'backbone',
    'scripts/chat/room/nick/nick_item_view'
],
function (Backbone, NickItemView) {

    var NickCollectionView = Backbone.Marionette.CollectionView.extend({

        initialize: function() {
            console.log("initialize a NickCollectionView");
        },

        itemView: NickItemView,

        /* ui selector cache */
        ui: {},

        /* Ui events hash */
        events: {},

        /* on render callback */
        onRender: function() {}
    });

    return NickCollectionView;

});
