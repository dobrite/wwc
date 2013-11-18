define([
    'backbone',
    'scripts/chat/room/message/message_item_view',
    'hbs!templates/composite/message_composite_template',
],
function (Backbone, MessageItemView, MessageCompositeTemplate) {

    var MessageCompositeView = Backbone.Marionette.CompositeView.extend({

        initialize: function() {},

        itemView: MessageItemView,

        itemViewContainer: '#thing',

        template: {
            type: 'handlebars',
            template: MessageCompositeTemplate
        },

        ui: {},

        events: {},

        collectionEvents: {},

        onRender: function() {},

        onShow: function() {
            this.listenTo(this.collection, 'sort', this.render);
        },

        onClose: function() {},

    });

    return MessageCompositeView;

});
