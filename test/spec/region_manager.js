define([
    'backbone',
    'scripts/region_manager',
],
function (Backbone, RegionManager) {

    describe('regionManager RegionManager', function () {

        it('should be an instance of Marionette.Controller', function () {
            expect( RegionManager ).to.be.an.instanceof( Backbone.Marionette.Controller );
        });

    });

});
