define([
    'backbone',
    'scripts/application',
    'scripts/region_manager',
    'scripts/communicator',
    'scripts/views/item/loginView',
],
function(Backbone, app, regionManager, communicator, LoginItemView) {

    var LoginController = Backbone.Marionette.Controller.extend({

        initialize: function (options) {
            console.log("initialize a LoginController Controller");
        },

        showLogin: function () {
            var loginItemView = new LoginItemView();

            loginItemView.on("login:submit", function (data) {
                console.log("loginItemView login:submit");
                //login logic here
                communicator.vent.trigger("login:submit");
            });

            regionManager.getRegion('mainPane').show(loginItemView);
        },

    });

    app.addInitializer(function () {
        console.log("loginController addInitializer");

        var loginController = new LoginController();

        communicator.vent.on('login:show', function () {
            loginController.showLogin();
        });
    });

    return LoginController;

});
