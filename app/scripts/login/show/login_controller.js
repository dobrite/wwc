define([
    'backbone',
    'scripts/application',
    'scripts/communicator',
    'scripts/login/show/login_item_view',
],
function(Backbone, app, communicator, LoginItemView) {

    var LoginController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            console.log("initialize a LoginController Controller");

            this.region = options.region;
        },

        showLogin: function (nick) {
            nickModel = new Backbone.Model({nick: nick});
            var loginItemView = new LoginItemView({model: nickModel});

            loginItemView.on("login:submit", function () {
                room = loginItemView.ui.room.val();
                if (room !== '') {
                    communicator.vent.trigger("login:submit", room);
                }else{
                    //TODO show error
                }
            });

            this.region.show(loginItemView);
        },

    });

    return LoginController;

});
