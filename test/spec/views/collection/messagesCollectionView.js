(function() {
    'use strict';

    var root = this;

    root.define([
        'views/collection/messagesCollectionView'
        ],
        function( MessagesCollectionView ) {

            describe('MessagesCollectionView', function () {

                it('should be an instance of MessagesCollectionView', function () {
                    var messagesCollectionView = new MessagesCollectionView();
                    expect( messagesCollectionView ).to.be.an.instanceof( MessagesCollectionView );
                });

            });

        });

}).call( this );
