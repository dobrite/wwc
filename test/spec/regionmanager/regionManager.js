(function() {
    'use strict';

    var root = this;

    root.define([
        'scripts/regionManager',
        'backbone.marionette'
        ],
        function( RegionManager, Marionette ) {

            describe('regionManager RegionManager', function () {

                it('should be an instance of Marionette.Controller', function () {
                    expect( RegionManager ).to.be.an.instanceof( Marionette.Controller );
                });

            });

        });

}).call( this );
