(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/centrifuge'
        ],
        function( Centrifuge ) {

            describe('Centrifuge Controller', function () {
                var options = {
                    url: 'http://localhost:8000/connection',
                    token: 'bed8d7cfd4f9284afa9c561501cf0f38',
                    project: '522d0945a4dd5f51e5523e59',
                    user: '2694',
                    //protocols_whitelist: ["xhr-streaming"],
                    debug: true
                };

                it('should be an instance of Centrifuge Controller', function () {
                    var centrifuge = new Centrifuge();
                    expect( centrifuge ).to.be.an.instanceof( Centrifuge );
                });

                it('initialize should default to empty options', function () {
                    var centrifuge = new Centrifuge();
                    expect( centrifuge.options ).to.be.empty;
                });

                it('initialize should take options', function(){
                    var options = {test: true};
                    var centrifuge = new Centrifuge(options);
                    expect( centrifuge.options ).to.be.equal(options);
                });

                it('should connect', function () {
                    var centrifuge = new Centrifuge(options);
                    centrifuge.connect();
                    expect( centrifuge ).to.be.an.instanceof( Centrifuge );
                });

                it('merge should merge options', function(){
                    var options = {test: true, nick: "nick"};
                    var centrifuge = new Centrifuge(options);
                    var newOptions = {test: false};
                    var mergedOptions = centrifuge.merge(newOptions);
                    expect(mergedOptions.test).to.be.false;
                });

                it('merge should merge empty options', function(){
                    var centrifuge = new Centrifuge();
                    var mergedOptions = centrifuge.merge();
                    expect(mergedOptions).to.be.empty;
                });

            });

        });

}).call( this );
