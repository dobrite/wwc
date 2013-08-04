(function() {
    'use strict';

    var root = this;

    root.define([
        'views/item/messageItemView'
        ],
        function( MessageItemView ) {

            describe('Message ItemView', function () {

                it('should be an instance of Message ItemView', function () {
                    var messageItemView = new MessageItemView();
                    expect( messageItemView ).to.be.an.instanceof( MessageItemView );
                });

                it('should contain a Message model', function () {
                    var messageItemView = new MessageItemView();
                    expect( messageItemView.model ).to.be.an.instanceof( MessageItemView );
                });

            });

        });

}).call( this );
