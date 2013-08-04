(function() {
    'use strict';

    var root = this;

    root.define([
        'application',
        'backbone.marionette',
        'backbone.wreqr'
        ],
        function( App, Marionette, Wreqr ) {

            describe('application App', function () {
                it('should be an instance of Mationette.Application', function () {
                    expect( App ).to.be.an.instanceof( Marionette.Application );
                });

                it('comes with a vent', function(){
                    expect( App.vent ).to.be.an.instanceof( Wreqr.EventAggregator );
                });

                it('comes with a reqres', function(){
                    expect( App.reqres ).to.be.an.instanceof( Wreqr.RequestResponse );
                });

                it('comes with a commands', function(){
                    expect( App.commands ).to.be.an.instanceof( Wreqr.Commands );
                });
            });

        });

}).call( this );
