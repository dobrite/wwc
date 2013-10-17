define([
    'backbone',
    'scripts/communicator',
    'scripts/models/user_model',
],
function (Backbone, Communicator, UserModel) {

    var UserCollection =  Backbone.Collection.extend({
        model: UserModel
    });

    return UserCollection;

});
