(function() {
    'use strict';

    var root = this;

    root.define([
        'scripts/regions/chatRegion'
        ],
        function( Chatregion ) {

            describe('Chatregion Region', function () {

                it('should be an instance of Chatregion Region', function () {
                    var chatRegion = new Chatregion();
                    expect( chatRegion ).to.be.an.instanceof( Chatregion );
                });

            });

        });

}).call( this );
