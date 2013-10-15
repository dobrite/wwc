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

            this.listenTo(communicator.vent, "chat:input:message", this.publishMessage);
        },

        showInput: function () {
            this.region.show(this.inputItemView);
        },

        publishMessage: function (message) {
            communicator.command.execute("ws:publish", message);
        },

        onClose: function () {
        },

    });

    return InputController;
});
