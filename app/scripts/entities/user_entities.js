define([
    "backbone",
    "scripts/communicator",
    "scripts/entities/collection/user_collection",
],
function (Backbone, communicator, UserCollection) {

    var initializeUsers = function () {

        var users = new UserCollection([
            {nick: "@Chanserv"},
            {nick: "Dave"},
            {nick: "Bill"},
        ]);

        return users;

    };

    var users = initializeUsers();

    var API = {
        getUsers: function () {
            //TODO replace with server lookup
            //and remove "module" scope users var
            return users;
        }
    };

    communicator.reqres.setHandler("entities:users", function () {
        return API.getUsers();
    });

    return ;

});
