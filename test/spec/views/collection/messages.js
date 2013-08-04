(function() {
    'use strict';

    var root = this;

    root.define([
        'views/collection/messages'
        ],
        function( Messages ) {

            describe('Messages Collectionview', function () {

                it('should be an instance of Messages Collectionview', function () {
                    var messages = new Messages();
                    expect( messages ).to.be.an.instanceof( Messages );
                });

                it('should have more test written', function(){
                    expect( false ).to.be.ok;
                });
            });

        });

}).call( this );
