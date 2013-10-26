define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/relation/message_relation',
],
function (Backbone, Communicator, MessageRelationalModel) {

    var MessageCollection =  Backbone.Collection.extend({
        model: MessageRelationalModel
    });

    return MessageCollection;

});
