define([
    "backbone",
    "scripts/communicator",
    "scripts/chat/common/common_layout",
    "scripts/chat/common/input/input_controller",
    "scripts/chat/common/channel/channel_controller",
],
function(Backbone, communicator, CommonLayout, InputController, ChannelController){

    var CommonController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            console.log("initializing a new CommonController");

            options = options || (options = {});
            this.region = options.region || {};

            this.commonLayout = new CommonLayout();

            this.inputController = new InputController({
                region: this.commonLayout.inputRegion
            });

            this.channelController = new ChannelController({
                region: this.commonLayout.channelRegion
            });

        },

        showCommon: function () {
            this.region.show(this.commonLayout);
            this.inputController.showInput();
            this.channelController.showChannels();
        },

        onClose: function () {
        },

    });

    return CommonController;
});
