define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/model/channel_model',
],
function (Backbone, Communicator, ChannelModel) {

    var ChannelCollection =  Backbone.Collection.extend({
        model: ChannelModel
    });

    return ChannelCollection;

});
