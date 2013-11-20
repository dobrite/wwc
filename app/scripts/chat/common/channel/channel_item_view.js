define([
    'backbone',
    'hbs!templates/item/channel_template'
],
function (Backbone, ChannelTemplate) {

    var ChannelItemView = Backbone.Marionette.ItemView.extend({
        tagName: "li",

        initialize: function() {
        },

        template: {
            type: 'handlebars',
            template: ChannelTemplate
        },

        ui: {},

        triggers: {
            "click .js-tab": "change",
            "click .js-remove": "remove",
        },

        events: {
            //TODO maybe one day...
            //"drag .js-tab": "logger",
            //"dragstart .js-tab": "logger",
            //"dragend .js-tab": "logger",
            //"dragenter .js-tab": "dropTarget",
            //"dragover .js-tab": "dropTarget",
            //"dragleave .js-tab": "logger",
            //"drop .js-tab": "logger",
        },

        onRender: function() {},

        //logger: function (event) {
        //    console.log(event);
        //},

        //dropTarget: function (event) {
        //    console.log("droptarget: ", event);
        //    //makes an element a valid drop target
        //    event.preventDefault();
        //},
    });

    return ChannelItemView;

});
