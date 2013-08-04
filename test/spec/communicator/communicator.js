(function() {
    'use strict';

    var root = this;

    root.define([
        'communicator',
        'backbone.marionette',
        'backbone.wreqr'
        ],
        function( Communicator, Marionette, Wreqr ) {

            describe('communicator Communicator', function () {
                it('should be an instance of Marionette.Controller', function () {
                    expect( Communicator ).to.be.an.instanceof( Marionette.Controller );
                });

                it('comes with a vent which is an Wreqr.EventAggregator', function(){
                    expect( Communicator.vent ).to.be.an.instanceof( Wreqr.EventAggregator );
                });

                it('comes with a reqres which is a Wreqr.RequestResponse', function(){
                    expect( Communicator.reqres ).to.be.an.instanceof( Wreqr.RequestResponse );
                });

                it('comes with a commands which is a Wreqr.Commands', function(){
                    expect( Communicator.command ).to.be.an.instanceof( Wreqr.Commands );
                });
            });

        });

}).call( this );
