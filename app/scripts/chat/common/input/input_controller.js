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

            //maybe a triggerMethod?
            this.listenTo(communicator.vent, "chat:input:message", this.publishMessage);
            this.listenTo(communicator.vent, "chat:show:room", this.currentRoom);
        },

        showInput: function () {
            this.region.show(this.inputItemView);
        },

        publishMessage: function (message) {
            communicator.command.execute("ws:publish", this.currentRoom, message);
        },

        currentRoom: function (room) {
            this.currentRoom = room;
        },

        onClose: function () {
        },

    });

    return InputController;
});
