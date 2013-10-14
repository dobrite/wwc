define([
    'backbone',
    'scripts/communicator',
    'scripts/models/channel_model',
],
function (Backbone, Communicator, ChannelModel) {

    var ChannelCollection =  Backbone.Collection.extend({
        model: ChannelModel
    });

    //Communicator.vent.on('ws:');

    return ChannelCollection;

});
