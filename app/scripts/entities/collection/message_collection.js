define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/model/message_model',
],
function (Backbone, communicator, MessageModel) {

    var MessageCollection =  Backbone.Collection.extend({
        model: MessageModel
    });

    return MessageCollection;

});
