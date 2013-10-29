define([
    'backbone',
    'scripts/entities/model/user_model',
    'scripts/entities/collection/user_collection',
    'scripts/entities/model/message_model',
    'scripts/entities/collection/message_collection',
],
function (Backbone, UserModel, UserCollection, MessageModel, MessageCollection) {

    var RoomModel = Backbone.Model.extend({

    });

    return RoomModel;

});
