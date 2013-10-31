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
                users: new UserCollection(),
                messages: new MessageCollection(),
            });

            //TODO all these need to be moved
            roomModel.get('users').listenToOnce(
                communicator.vent,
                room + ":presence",
                function (users) {
                    roomModel.get('users').add(users);
                }
            );

            roomModel.get('users').listenTo(
                communicator.vent,
                room + ":join",
                function (message) {
                    var users = roomModel.get('users');
                    var added = {nick: message.nick};
                    users.add(added);
                }
            );

            roomModel.get('users').listenTo(
                communicator.vent,
                room + ":leave",
                function (message) {
                    var users = roomModel.get('users');
                    var removed = _.findWhere({nick: message.nick});
                    users.remove(removed);
                }
            );

            roomModel.listenToOnce(
                communicator.vent,
                room + ":history",
                function (messages) {
                    roomModel.get('messages').add(messages);
                }
            );

            roomModel.get('messages').listenTo(
                communicator.vent,
                room + ":join",
                function (message) {
                    roomModel.get('messages').add(message);
                }
            );

            roomModel.get('messages').listenTo(
                communicator.vent,
                room + ":leave",
                function (message) {
                    roomModel.get('messages').add(message);
                }
            );

            roomCollection.add(roomModel);

            return roomModel;
        },
        addMessage: function (message) {
            roomCollection.findWhere({id: message.channel}).get('messages').add(message);
        }
    };

    communicator.reqres.setHandler("entities:room:add", function (room) {
        return API.roomAdd(room);
    });

    //TODO add a single domain communicator handler for message
    //
    return ;

});
