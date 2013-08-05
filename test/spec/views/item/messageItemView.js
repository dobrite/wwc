(function() {
    'use strict';

    var root = this;

    root.define([
        'views/item/messageItemView',
        'models/message'
        ],
        function( MessageItemView, Message ) {

            describe('MessageItemView', function () {

                it('should be an instance of MessageItemView', function () {
                    var messageItemView = new MessageItemView();
                    expect( messageItemView ).to.be.an.instanceof( MessageItemView );
                });

            });

        });

}).call( this );
