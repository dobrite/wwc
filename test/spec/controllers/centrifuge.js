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

            });

        });

}).call( this );
