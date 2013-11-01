define([
    "backbone",
    "underscore",
    "scripts/communicator",
    'scripts/entities/model/room_model',
    "scripts/entities/collection/room_collection",
    "scripts/entities/collection/user_collection",
    "scripts/entities/model/message_model",
    "scripts/entities/collection/message_collection",
],
function (
    Backbone,
    _,
    communicator,
    RoomModel,
    RoomCollection,
    UserCollection,
    MessageModel,
    MessageCollection
) {

    var roomCollection = new RoomCollection();

    var API = {
        roomAdd: function (room) {
            roomModel = new RoomModel({
                channel: room,
                users: new UserCollection([], {channel: room}),
                messages: new MessageCollection([], {channel: room }),
            });

            roomCollection.add(roomModel);

            return roomModel;
        },
        roomRemove: function (room) {
            var removed = roomCollection.findWhere({channel: room});
            roomCollection.remove(removed);
            console.log("removing room entitie");
        },
        addMessage: function (message) {
            roomCollection.findWhere({id: message.channel}).get('messages').add(message);
        }
    };

    communicator.reqres.setHandler("entities:room:add", function (room) {
        return API.roomAdd(room);
    });

    communicator.reqres.setHandler("entities:room:remove", function (room) {
        return API.roomRemove(room);
    });


    //TODO add a single domain communicator handler for message
    //
    return ;

});
