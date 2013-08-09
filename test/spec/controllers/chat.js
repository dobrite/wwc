(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/chat'
        ],
        function( Chat ) {

            describe('Chat Controller', function () {

                it('should be an instance of Chat Controller', function () {
                    var chat = new Chat();
                    expect( chat ).to.be.an.instanceof( Chat );
                });

            });

        });

}).call( this );
