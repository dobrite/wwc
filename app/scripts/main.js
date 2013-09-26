(function() {
    'use strict';

    var root = this;

    root.require([
        'app/scripts/application',
    ],
    function (App) {
        App.start();
    });
}).call(this);
