define([
    'backbone',
    'backbone.wreqr',
    'scripts/application',
],
function (Backbone, Wreqr, App) {

    describe('Application App', function () {
        it('should be an instance of Backbone.Marionette.Application', function () {
            expect( App ).to.be.an.instanceof( Backbone.Marionette.Application );
        });

        it('comes with a vent', function () {
            expect( App.vent ).to.be.an.instanceof( Wreqr.EventAggregator );
        });

        it('comes with a reqres', function () {
            expect( App.reqres ).to.be.an.instanceof( Wreqr.RequestResponse );
        });

        it('comes with a commands', function () {
            expect( App.commands ).to.be.an.instanceof( Wreqr.Commands );
        });
    });
});
