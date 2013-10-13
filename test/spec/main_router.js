define([
    'backbone',
    'scripts/main_router'
],
function (Backbone, MainRouter) {

    describe('Router mainRouter', function () {
        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('should be an instance of Backbone.Router', function () {
            var mainRouter = new MainRouter();
            expect(mainRouter).to.be.an.instanceof(Backbone.Router);
        });

        it('should take a history object as an option', function () {
            var test = {test:'test'};
            var testHistory = {history: test};
            var testMainRouter = new MainRouter(testHistory);
            expect(testMainRouter.history).to.be.equal(test);
        });

        it('start should delegate to Backbone.history.start', function () {
            var testHistory = {history: {start: sinon.spy()}};
            var testMainRouter = new MainRouter(testHistory);
            testMainRouter.startHistory();
            expect(testHistory.history.start).to.have.been.called;
        });

        it('navigate should delegate to Backbone.history', function () {
            var testHistory = {history: {navigate: sinon.spy()}};
            var testMainRouter = new MainRouter(testHistory);
            testMainRouter.navigate('test', {some: 'other'});
            expect(testHistory.history.navigate).to.have.been.calledWith('test');
        });

        it('getCurrentRouter should delegate to Backbone.historyfragment', function () {
            var testFragment = {fragment: 'test'};
            var testHistory = {history: testFragment};
            var testMainRouter = new MainRouter(testHistory);
            fragment = testMainRouter.getCurrentRoute();
            expect(fragment).to.been.equal(testFragment.fragment);
        });

    });
});
