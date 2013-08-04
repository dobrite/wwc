(function() {
    'use strict';

    var root = this;

    root.define([
        'regionManager',
        'backbone.marionette'
        ],
        function( regionManager, Marionette ) {

            describe('regionManager RegionManager', function () {

                it('should be an instance of Marionette.Controller', function () {
                    expect( regionManager ).to.be.an.instanceof( Marionette.Controller );
                });

            });

        });

}).call( this );
