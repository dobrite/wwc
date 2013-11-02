define([
    'backbone',
    'scripts/communicator',
    'scripts/login/show/login_item_view',
],
function(Backbone, communicator, LoginItemView) {

    var LoginController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            this.region = options.region;
        },

        showLogin: function (nick) {
            nickModel = new Backbone.Model({nick: nick});
            var loginItemView = new LoginItemView({model: nickModel});

            loginItemView.on("login:submit", function (room) {
                communicator.vent.trigger("login:submit", room);
            });

            this.region.show(loginItemView);
        },

    });

    return LoginController;

});
