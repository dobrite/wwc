define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/relation/user_relation',
],
function (Backbone, Communicator, UserRelationalModel) {

    var UserCollection =  Backbone.Collection.extend({
        model: UserRelationalModel
    });

    return UserCollection;

});
