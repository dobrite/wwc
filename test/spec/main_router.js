define([
    'scripts/main_router'
],
function (mainRouter) {

    describe('Router mainRouter', function () {

        it('navigate should delegate to Backbone.history', function () {
            var {Backbone: {history: {navigate: sinon.spy()}}};
            expect( mainRouter ).to.be.an.instanceof(MainRouter);
        });


        it('navigate should delegate to Backbone.history', function () {
            var {Backbone: {history: {navigate: sinon.spy()}}};
            expect( mainRouter ).to.be.an.instanceof(MainRouter);
        });

    });

});
