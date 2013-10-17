define([
    'backbone',
    'scripts/application',
    'scripts/communicator',
    'scripts/login/show/login_item_view',
    'scripts/entities/model/user_model',
],
function(Backbone, app, communicator, LoginItemView, UserModel) {

    var LoginController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            console.log("initialize a LoginController Controller");

            this.region = options.region;
        },

        showLogin: function () {
            var loginItemView = new LoginItemView();

            loginItemView.on("login:submit", function (data) {
                var nick = loginItemView.ui.nick.val();
                var self = {nick: nick, self: true};
                communicator.command.execute("entities:user:add", self);

                //login logic here
                communicator.vent.trigger("login:submit");
            });

            this.region.show(loginItemView);
        },

    });

    return LoginController;

});
