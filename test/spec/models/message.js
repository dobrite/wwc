(function() {
    'use strict';

    var root = this;

    root.define([
        'models/message'
        ],
        function( Message ) {

            describe('Message Model', function () {

                it('should be an instance of Message Model', function () {
                    var message = new Message();
                    expect( message ).to.be.an.instanceof( Message );
                });

                it('should have more test written', function(){
                    expect( false ).to.be.ok;
                });
            });

        });

}).call( this );
