require.config({

    noGlobal: true,

    baseUrl: "app",

    nameSpace: "WWC",

    deps: [
        'underscore',
        'backbone',
        'backbone.marionette',
        'bootstrap',
        'marionette.handlebars'
    ],

    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'jquery',
        },
    },

    paths: {
        jquery: 'bower_components/jquery/jquery',
        backbone: 'bower_components/backbone-amd/backbone',
        underscore: 'bower_components/underscore-amd/underscore',

        'backbone.marionette': 'bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',

        moment: "bower_components/momentjs/moment",
        uuid: "bower_components/node-uuid/uuid",

        'sockjs-client': 'bower_components/socksjs-client/sockjs-0.3.4.min',

        centrifuge: 'bower_components/centrifuge-client/centrifuge',

        text: 'bower_components/requirejs-text/text',
        templates: 'templates',

        handlebars: 'bower_components/require-handlebars-plugin/Handlebars',

        i18nprecompile: 'bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: 'bower_components/require-handlebars-plugin/hbs/json2',
        hbs: 'bower_components/require-handlebars-plugin/hbs',

        'marionette.handlebars': 'bower_components/backbone.marionette.handlebars/backbone.marionette.handlebars'
    },

    hbs: {
        disableI18n: true,
        helperPathCallback: function(name) {return 'templates/helpers/' + name;}
    }
});

(function (exports) {
    'use strict';

    define([
        'scripts/application',
    ],
    function (app) {
        console.log("here");

        var App = function (params) {
            app.configure.apply(this, arguments);
            app.start();
            return app;
        };

        App.prototype = app.prototype;

        return App;

    });

}(this));
