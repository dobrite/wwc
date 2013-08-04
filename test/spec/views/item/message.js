(function() {
    'use strict';

    var root = this;

    root.define([
        'views/item/message'
        ],
        function( Message ) {

            describe('Message Itemview', function () {

                it('should be an instance of Message Itemview', function () {
                    var message = new Message();
                    expect( message ).to.be.an.instanceof( Message );
                });

                it('should have more test written', function(){
                    expect( false ).to.be.ok;
                });
            });

        });

}).call( this );
