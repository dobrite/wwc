define([
    "backbone",
    "scripts/application",
    "scripts/communicator",
    "scripts/region_manager",
    "scripts/login/show/login_controller",
],
function (Backbone, app, communicator, regionManager, LoginController) {

    var LoginRouter = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            "login" : "showLogin"
        }
    });

    var loginController = new LoginController({
        region: regionManager.getRegion('mainPane')
    });

    var API = {
        showLogin: function (nick) {
            loginController.showLogin(nick);
        }
    };

    communicator.vent.on("login:show", function (nick) {
        communicator.command.execute("router:navigate", "login");
        API.showLogin(nick);
    });

    app.addInitializer(function () {
        new LoginRouter({
            controller: API
        });
    });

    return LoginRouter;
});
