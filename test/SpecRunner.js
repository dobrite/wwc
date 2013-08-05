require.config({
    baseUrl: '../app/scripts',
    urlArgs: 'cb=' + Math.random(),

    deps: ['backbone.marionette', 'marionette.handlebars'],

    shim: {
        mocha: {
            exports: 'mocha',
        },
    },

    paths: {
        spec: '../../test/spec', // lives in the test directory

        mocha: '../bower_components/mocha/mocha',
        chai: '../bower_components/chai/chai',
        sinon: '../bower_components/sinonjs/sinon',
        'sinon-chai': '../bower_components/sinon-chai/lib/sinon-chai',

        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',

        socketio: '../bower_components/socket.io-client/dist/socket.io',
        boneio: '../bower_components/bone.io/bone.io',

        /* backbone plugins */
        'backbone.syphon': '../bower_components/backbone.syphon/lib/amd/backbone.syphon',
        'backbone.iobind': '../bower_components/backbone.iobind/dist/backbone.iobind',

        /* alias all marionette libs */
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: 'vendor/bootstrap',
        'bootstrap-button': 'vendor/bootstrap-button',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',
        tmpl: "../templates",

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs',

        /* marionette and handlebars plugin */
        'marionette.handlebars': '../bower_components/backbone.marionette.handlebars/backbone.marionette.handlebars'
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
    'spec/testSuite'
],
function( mocha, chai, sinon, sinonChai, $, testSuite ) {

    'use strict';

    mocha.ui('bdd');
    mocha.reporter('html');

    //has to be a better way
    window.expect = chai.expect,
    window.should = chai.should(),
    window.assert = chai.assert;

    /* on dom ready require all specs and run */
    $( function() {
        require( testSuite.specs, function() {
            if (window.mochaPhantomJS) {
                mochaPhantomJS.run();
            }
            else {
                mocha.run();
            }

        });
    });
});

