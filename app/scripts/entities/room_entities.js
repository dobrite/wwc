define([
    "backbone",
    "underscore",
    "scripts/communicator",
    'scripts/entities/model/room_model',
    "scripts/entities/collection/room_collection",
    "scripts/entities/collection/user_collection",
    "scripts/entities/collection/message_collection",
],
function (
    Backbone,
    _,
    communicator,
    RoomModel,
    RoomCollection,
    UserCollection,
    MessageCollection
) {

    var roomCollection = new RoomCollection();

    var API = {
        roomAdd: function (room) {
            roomModel = new RoomModel({
                id: room,
                users: new UserCollection(),
                messages: new MessageCollection(),
            });
            roomCollection.add(roomModel);

            communicator.command.execute("ws:subscribe", {channel: room});
            communicator.vent.on("ws:subscribe:success", function (subscribe) {
                if(subscribe.params.channel === room){

                    communicator.command.execute("ws:presence", room, function (presence) {
                        roomModel.get('users').add(_.values(presence));
                    });


                    communicator.command.execute("ws:history", room, function (history) {
                        roomModel.get('messages').add(_.values(history));
                    });

                }

            });

            return roomModel;
        },
        addMessage: function (message) {
            roomCollection.findWhere({id: message.channel}).get('messages').add(message);
        },
    };

    communicator.reqres.setHandler("entities:room:add", function (room) {
        return API.roomAdd(room);
    });

    communicator.vent.on("ws:message", function (message) {
        API.addMessage(message);
    });

    //communicator.command.setHandler("entities:user:add", function (user) {
    //    API.addUser(user);
    //});

    return ;

});
