define([
    "backbone",
    "scripts/communicator",
    "scripts/entities/relation/room_relation",
],
function (Backbone, communicator, RoomRelationalModel) {//, RoomCollection, MessageCollection) {

    var initializeRooms = function () {

        var general = RoomRelationalModel( { name: 'general' } );
        var dave = new UserModel({nick: 'dave', inRoom: general});
        //var users = new UserCollection([
        //    {nick: "@Chanserv"},
        //    {nick: "Dave"},
        //    {nick: "Bill"},
        //]);

        //return users;

    };

    var users = initializeRooms();

    var API = {
        //getUsers: function () {
        //    //TODO replace with server lookup
        //    //and remove "module" scope users var
        //    return users;
        //},
        //addUser: function (user) {
        //    users.add(user);
        //},
        //getSelf: function () {
        //    //only one
        //    return users.where({self: true})[0];
        //}
    };

    //communicator.reqres.setHandler("entities:users:get", function () {
    //    return API.getUsers();
    //});

    //communicator.reqres.setHandler("entities:user:self", function () {
    //    return API.getSelf();
    //});

    //communicator.command.setHandler("entities:user:add", function (user) {
    //    API.addUser(user);
    //});

    return ;

});
