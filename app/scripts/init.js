(function() {
    'use strict';

    var root = this;

    root.require.config({

        baseUrl: "../../",

        /* starting point for application */
        deps: ['backbone.marionette', 'bootstrap', 'marionette.handlebars', 'app/scripts/main'],

        shim: {
            handlebars: {
                exports: 'Handlebars'
            },
            backbone: {
                deps: [
                    'underscore',
                    'jquery'
                ],
                exports: 'Backbone'
            },
            bootstrap: {
                deps: [
                    'jquery'
                ],
                exports: 'jquery'
            },
            "sockjs-client": {
                exports: 'SockJS'
            }
        },

        paths: {
            jquery: 'app/bower_components/jquery/jquery',
            backbone: 'app/bower_components/backbone-amd/backbone',
            underscore: 'app/bower_components/underscore-amd/underscore',

            /* alias all marionette libs */
            'backbone.marionette': 'app/bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
            'backbone.wreqr': 'app/bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
            'backbone.babysitter': 'app/bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

            /* alias the bootstrap js lib */
            bootstrap: 'app/bower_components/bootstrap/dist/js/bootstrap',

            /* alias socksjs js client lib */
            'sockjs-client': 'app/bower_components/socksjs-client/sockjs-0.3.4.min',

            /* alias centrifuge js client lib */
            centrifuge: 'app/bower_components/centrifuge-client/centrifuge',

            /* Alias text.js for template loading and shortcut the templates dir to tmpl */
            text: 'app/bower_components/requirejs-text/text',
            tmpl: "app/templates",

            /* handlebars from the require handlerbars plugin below */
            handlebars: 'app/bower_components/require-handlebars-plugin/Handlebars',

            /* require handlebars plugin - Alex Sexton */
            i18nprecompile: 'app/bower_components/require-handlebars-plugin/hbs/i18nprecompile',
            json2: 'app/bower_components/require-handlebars-plugin/hbs/json2',
            hbs: 'app/bower_components/require-handlebars-plugin/hbs',

            /* marionette and handlebars plugin */
            'marionette.handlebars': 'app/bower_components/backbone.marionette.handlebars/backbone.marionette.handlebars'
        },

        hbs: {
            disableI18n: true
        }
    });
}).call( this );
