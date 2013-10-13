(function () {
    'use strict';

    var root = this;

    root.require([
        'scripts/application',
        'scripts/main_router',
    ],
    function (App, MainRouter) {
        var mainRouter = new MainRouter();
        App.start();
    });
}).call(this);
