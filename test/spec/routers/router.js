(function() {
    'use strict';

    var root = this;

    root.define([
        'routers/router'
        ],
        function( Router ) {

            describe('Router Router', function () {

                it('should be an instance of Router Router', function () {
                    var router = new Router();
                    expect( router ).to.be.an.instanceof( Router );
                });

            });

        });

}).call( this );
