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
                function (message) {
                    var removed = _.findWhere({nick: message.nick});
                    this.remove(removed);
                }
            );

        },

        model: UserModel,
    });

    return UserCollection;

});
