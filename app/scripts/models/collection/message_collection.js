define([
    'backbone',
    'scripts/communicator',
    'scripts/models/message_model',
],
function (Backbone, Communicator, MessageModel) {

    var MessageCollection =  Backbone.Collection.extend({
        model: MessageModel
    });

    return MessageCollection;

});
