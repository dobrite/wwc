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

                it('should have a chatPane region', function(){
                    expect( App.chatPane ).to.be.an.instanceof( Marionette.Region );
                });

                it('should have a nickPane region', function(){
                    expect( App.nickPane ).to.be.an.instanceof( Marionette.Region );
                });

                it('should have an inputPane region', function(){
                    expect( App.inputPane ).to.be.an.instanceof( Marionette.Region );
                });

                it('comes with a vent', function(){
                    expect( App.vent ).to.be.an.instanceof( Wreqr.EventAggregator );
                });
            });

        });

}).call( this );
