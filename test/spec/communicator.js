define([
    'backbone',
    'backbone.wreqr',
    'scripts/communicator',
],
function (Backbone, Wreqr, Communicator) {

    describe('communicator Communicator', function () {
        it('should be an instance of Marionette.Controller', function () {
            expect( Communicator ).to.be.an.instanceof( Backbone.Marionette.Controller );
        });

        it('comes with a vent which is an Wreqr.EventAggregator', function () {
            expect( Communicator.vent ).to.be.an.instanceof( Wreqr.EventAggregator );
        });

        it('comes with a reqres which is a Wreqr.RequestResponse', function () {
            expect( Communicator.reqres ).to.be.an.instanceof( Wreqr.RequestResponse );
        });

        it('comes with a commands which is a Wreqr.Commands', function () {
            expect( Communicator.command ).to.be.an.instanceof( Wreqr.Commands );
        });

    });

});
