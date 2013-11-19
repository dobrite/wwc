define([
    'backbone',
    'scripts/chat/room/message/message_item_view',
    'hbs!templates/composite/message_composite_template',
],
function (Backbone, MessageItemView, MessageCompositeTemplate) {

    var MessageCompositeView = Backbone.Marionette.CompositeView.extend({

        initialize: function() {},

        itemView: MessageItemView,

        itemViewContainer: '#messages',

        template: {
            type: 'handlebars',
            template: MessageCompositeTemplate
        },

        ui: {},

        events: {
            'click [data-toggle=offcanvas]': 'toggleOffCanvas',
        },

        collectionEvents: {},

        onRender: function() {},

        onShow: function() {
            this.listenTo(this.collection, 'sort', this.render);
        },

        onClose: function() {},

        toggleOffCanvas: function() {
            console.log('click');
            $('.row-offcanvas').toggleClass('active');
        },

    });

    return MessageCompositeView;

});
