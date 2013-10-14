define([
    "backbone",
    "scripts/communicator",
    "scripts/chat/common/input/input_item_view",
],
function (Backbone, communicator, InputItemView) {

    var InputController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            options = options || (options = {});
            this.region = options.region;

            this.inputItemView = new InputItemView();

            //subscribe to room
        },

        showInput: function () {
            this.region.show(this.inputItemView);
        },

        onClose: function () {
        },

    });

    return InputController;
});
