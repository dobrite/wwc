(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/centrifuge'
        ],
        function( Centrifuge ) {

            describe('Centrifuge Controller', function () {

                it('should be an instance of Centrifuge Controller', function () {
                    var centrifuge = new Centrifuge();
                    expect( centrifuge ).to.be.an.instanceof( Centrifuge );
                });

                it('should connect', function () {
                    var centrifuge = new Centrifuge();
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
