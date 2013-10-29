define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/model/room_model',
],
function (Backbone, Communicator, RoomModel) {

    var RoomCollection =  Backbone.Collection.extend({
        model: RoomModel
    });

    return RoomCollection;

});
