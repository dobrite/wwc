(function() {
    'use strict';

    var root = this;

    root.define([
        'regions/chatRegion'
        ],
        function( Chatregion ) {

            describe('Chatregion Region', function () {

                it('should be an instance of Chatregion Region', function () {
                    var chatRegion = new Chatregion();
                    expect( chatRegion ).to.be.an.instanceof( Chatregion );
                });

                it('should have more test written', function(){
                    expect( false ).to.be.ok;
                });
            });

        });

}).call( this );
