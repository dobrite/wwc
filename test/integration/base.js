(function() {
    'use strict';

    var root = this;

    root.define([
        'jquery',
        'application'
        ],
        function( $, App, require ) {

            App.start();

            describe('The main page', function () {
                it.only('should contain a container', function () {
                    var webdriver = require('selenium-webdriver');
                    var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
                    driver.get('http://localhost:8080/');
                    console.log(driver.getTitle());
                    //expect($('#container').length).to.be.equal(1);
                });


            });

        });

}).call( this );
