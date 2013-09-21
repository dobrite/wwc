(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'application',
        'regionManager',
        'communicator',
        'views/item/loginView',
    ],
    function(Backbone, App, RegionManager, Communicator, LoginItemView) {

        var LoginController = Backbone.Marionette.Controller.extend({

            initialize: function (options) {
                console.log("initialize a LoginController Controller");
            },

            showLogin: function () {
                var loginItemView = new LoginItemView();
                RegionManager.getRegion('mainPane').show(loginItemView);
            },

        });

        App.addInitializer(function () {
            console.log("loginController addInitializer");

            var loginController = new LoginController();

            Communicator.vent.on('login:show', function () {
                loginController.showLogin();
            });
        });

        return LoginController;

    });
}).call(this);
