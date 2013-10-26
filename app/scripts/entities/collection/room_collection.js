define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/relation/room_relation',
],
function (Backbone, Communicator, RoomRelationalModel) {

    var RoomCollection =  Backbone.Collection.extend({
        model: RoomRelationalModel
    });

    return RoomCollection;

});
