(function() {
    'use strict';

    var root = this;

    root.define([
        'scripts/models/message'
        ],
        function( Message ) {

            describe('Message Model', function () {

                it('should be an instance of Message Model', function () {
                    var message = new Message();
                    expect( message ).to.be.an.instanceof( Message );
                });

                it('should have a nick property that defaults to an empty string', function(){
                    var message = new Message();
                    expect( message.get('nick') ).to.be.equal('');
                });

                it('should have a text property that defaults to an empty string', function(){
                    var message = new Message();
                    expect( message.get('text') ).to.be.equal('');
                });

                it('should set a nick and text when passed them', function(){
                    var message = new Message({nick: 'Nick', text: 'some text'});
                    expect( message.get('nick') ).to.be.equal('Nick');
                    expect( message.get('text') ).to.be.equal('some text');
                });

            });

        });

}).call( this );
