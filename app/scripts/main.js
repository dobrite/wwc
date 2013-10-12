(function () {
    'use strict';

    var root = this;

    root.require([
        'scripts/application',
    ],
    function (App) {
        App.start();
    });
}).call(this);
