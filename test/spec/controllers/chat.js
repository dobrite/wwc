define([
    'scripts/controllers/chatController',
],
function (Chat) {

    describe('Chat Controller', function () {

        it('should be an instance of Chat Controller', function () {
            var chat = new Chat();
            expect( chat ).to.be.an.instanceof( Chat );
        });

    });

});
