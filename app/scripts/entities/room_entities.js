define([
    "jquery",
    "backbone",
    "underscore",
    "scripts/communicator",
    'scripts/entities/relation/room_relation',
    "scripts/entities/collection/room_collection",
],
function ($, Backbone, _, communicator, RoomRelationalModel, RoomCollection) {

    var roomCollection = new RoomCollection();

    var API = {
        roomAdd: function (room) {
            roomRelationalModel = new RoomRelationalModel({id: room});
            roomCollection.add(roomRelationalModel);

            communicator.command.execute("ws:subscribe", {channel: room});
            communicator.vent.on("ws:subscribe:success", function () {
                presence_defer = $.Deferred();

                communicator.command.execute("ws:presence", function (data) {
                    roomRelationalModel.get('users').add(_.values(data));
                    presence_defer.resolve(data);
                });

                history_defer = $.Deferred();

                communicator.command.execute("ws:history", function (data) {
                    roomRelationalModel.get('messages').add(_.values(data));
                    history_defer.resolve(data);
                });

                //TODO listen for an add on messages and at that time add a user model
                $.when(presence_defer, history_defer).done(function (presence, history) {
                    _.each(roomRelationalModel.get('messages'), function (elem, index, list) {
                        //no elem available
                        var client_id = list.models[index].get('client_id');
                    });
                });
            });

            return roomRelationalModel;
        },
        addMessage: function (message) {
            roomRelationalModel.get('messages').add(message);
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
