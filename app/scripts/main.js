(function () {
    'use strict';

    var root = this;

    root.require([
        'scripts/application',
        'scripts/main_router',
    ],
    function (app, MainRouter) {
        var mainRouter = new MainRouter();
        app.start();
    });
}).call(this);
