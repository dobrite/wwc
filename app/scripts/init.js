require.config({
    //no global moment object
    noGlobal: true,

    baseUrl: "app",

    /* starting point for application */
    deps: [
        'backbone',
        'backbone.marionette',
        'bootstrap',
        'marionette.handlebars',
        'scripts/main'
    ],

    shim: {
        handlebars: {
            exports: 'Handlebars'
        },
        underscore: {
            exports: '_',
        },
        backbone: {
            deps: [
                'underscore',
                'jquery',
            ],
            exports: 'Backbone',
        },
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'jquery',
        },
        "sockjs-client": {
            exports: 'SockJS'
        }
    },

    paths: {
        jquery: 'bower_components/jquery/jquery',
        backbone: 'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore/underscore',

        'backbone.marionette': 'bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',

        moment: "bower_components/momentjs/moment",

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
