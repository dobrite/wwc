define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/model/user_model',
],
function (Backbone, communicator, UserModel) {

    var UserCollection =  Backbone.Collection.extend({
        initialize: function (models, options) {
            this.channel = options.channel;

            this.listenToOnce(
                communicator.vent,
                this.channel + ":presence",
                this.add
            );

            this.listenTo(
                communicator.vent,
                this.channel + ":join",
                this.add
            );

            this.listenTo(
                communicator.vent,
                this.channel + ":leave",
                this.removeUser
            );

        },

        removeUser: function (user) {
            //translate client_id to id if exists
            //some cent messages (join/leave) don't have message uuid
            //so we create one and store client uuid in client_id
            //user collection uses client_id as model id
            user.id = user.client_id || user.id;
            this.remove(user);
        },

        model: UserModel,
    });

    return UserCollection;

});
