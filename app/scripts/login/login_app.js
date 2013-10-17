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
        showLogin: function () {
            loginController.showLogin();
        }
    };

    communicator.vent.on("login:show", function (room) {
        communicator.command.execute("router:navigate", "login");
        API.showLogin();
    });

    app.addInitializer(function(){
        console.log("login_app initialize");

        new LoginRouter({
            controller: API
        });
    });

    return LoginRouter;
});
