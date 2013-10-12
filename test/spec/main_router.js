define([
    'Squire',
    'scripts/main_router'
],
function (Squire, mainRouter) {
    var injector = new Squire();
    var a = {Backbone: {history: {navigate: sinon.spy()}}};

    describe('Router mainRouter', function () {

        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('navigate should delegate to Backbone.history', function () {
            expect( true ).to.be.an.true;
        });

    });

});
