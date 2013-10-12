require.config({
    baseUrl: '../app',
    urlArgs: 'cb=' + Math.random(),

    deps: [
        'backbone.marionette',
        'marionette.handlebars'
    ],

    shim: {
        mocha: {
            exports: 'mocha',
        }
    },

    paths: {
        spec: '../test/spec', // lives in the test directory
        integration: '../test/integration', // lives in the test directory

        mocha: '../node_modules/mocha/mocha',
        chai: '../node_modules/chai/chai',
        sinon: '../node_modules/sinon/pkg/sinon',
        'sinon-chai': '../node_modules/sinon-chai/lib/sinon-chai',
        Squire: '../node_modules/squirejs/src/Squire',

        jquery: 'bower_components/jquery/jquery',
        backbone: 'bower_components/backbone-amd/backbone',
        underscore: 'bower_components/underscore-amd/underscore',

        centrifuge: 'bower_components/centrifuge-client/centrifuge',

        'sockjs-client': 'bower_components/socksjs-client/sockjs-0.3.4.min',

        /* backbone plugins */
        'backbone.syphon': 'bower_components/backbone.syphon/lib/amd/backbone.syphon',
        'backbone.iobind': 'bower_components/backbone.iobind/dist/backbone.iobind',

        /* alias all marionette libs */
        'backbone.marionette': 'bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': 'bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: 'vendor/bootstrap',
        'bootstrap-button': 'vendor/bootstrap-button',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: 'bower_components/requirejs-text/text',
        tmpl: "templates",

        /* handlebars from the require handlerbars plugin below */
        handlebars: 'bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: 'bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: 'bower_components/require-handlebars-plugin/hbs/json2',
        hbs: 'bower_components/require-handlebars-plugin/hbs',

        /* marionette and handlebars plugin */
        'marionette.handlebars': 'bower_components/backbone.marionette.handlebars/backbone.marionette.handlebars'
    },

    hbs: {
        disableI18n: true
    }
});

/* require test suite */
require([
    'mocha',
    'chai',
    'sinon',
    'sinon-chai',
    'jquery',
    'spec/test_suite',
    'integration/test_suite'
],
function (mocha, chai, sinon, sinonChai, $, specTestSuite, integrationTestSuite) {
    'use strict';

    global.expect = chai.expect,

    mocha.ui('bdd');
    mocha.reporter('html');

    chai.use(sinonChai);

    /* on dom ready require all specs, integration tests and run */
    $(function () {
        require (specTestSuite.specs, function () { //.concat(integrationTestSuite.integrations), function() {
            if (window.mochaPhantomJS) {
                console.log("Phantom");
                mochaPhantomJS.run();
            }
            else {
                console.log("Mocha");
                mocha.run();
            }
        });
    });
});

