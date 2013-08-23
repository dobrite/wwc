(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/boneio',
        'communicator'
        ],
        function( Boneio, Communicator ) {

            var socketURL = 'http://0.0.0.0:8080';

            var testOptions = {
                transports: ['websocket'],
                'force new connection': true
            };

            var chatUser1 = {'name':'Tom'};
            var chatUser2 = {'name':'Sally'};
            var chatUser3 = {'name':'Dana'};

            describe('Boneio Controller', function () {

                it('should be an instance of Boneio Controller', function () {
                    var boneio = new Boneio();
                    expect( boneio ).to.be.an.instanceof( Boneio );
                });

                it('initialize should default to empty options', function () {
                    var boneio = new Boneio();
                    expect( boneio.options ).to.be.empty;
                });

                it('initialize should take options', function(){
                    var options = {test: true};
                    var boneio = new Boneio(options);
                    expect( boneio.options ).to.be.equal(options);
                });

                it('initialize should be able to take a custom communicator', function(){
                    var customCommunicator = sinon.spy();
                    var options = {communicator: customCommunicator};
                    var boneio = new Boneio(options);
                    expect( boneio.communicator ).to.be.equal(customCommunicator);
                });

                it('merge should merge options', function(){
                    var options = {test: true, nick: "nick"};
                    var boneio = new Boneio(options);
                    var newOptions = {test: false};
                    var mergedOptions = boneio.merge(newOptions);
                    expect(mergedOptions.test).to.be.false;
                });

                it('merge should merge empty options', function(){
                    var boneio = new Boneio();
                    var mergedOptions = boneio.merge();
                    expect(mergedOptions).to.be.empty;
                });

                describe('connected functions', function () {
                    var obj = {vent: {trigger: sinon.spy()}};
                    var boneio = new Boneio({communicator: obj});

                    beforeEach(function (done) {
                        boneio.connect(socketURL, testOptions);
                        done();
                    });

                    afterEach(function (done) {
                        boneio.disconnect();
                        done();
                    });

                    it('socket should be connected after calling connect', function(done){
                        expect(boneio.socket.connected).to.be.true;
                        done();
                    });

                    it('communicator should emit an io:connect event on connection', function(done){
                        expect(obj.vent.trigger).to.have.been.calledWith('io:connect');
                        done();
                    });

                    it.skip('communicator should emit an io:disconnect event prior to disconnect', function(done){
                        var obj = {vent: {trigger: sinon.spy()}};
                        var boneio = new Boneio({communicator: obj});
                        boneio.connect(socketURL, testOptions);
                        boneio.socket.on('disconnect', function(data){
                            expect(obj.vent.trigger).to.have.been.calledWith('io:disconnect');
                        });
                        boneio.disconnect();
                        done();
                    });

                    it.skip('socket should be notified when another client connects', function(done){
                        var boneio = new Boneio();
                        boneio.connect(socketURL, testOptions);
                        boneio.socket.on('connect', function(data){
                            expect(boneio1.socket.connected).to.be.true;
                            done();
                        });
                    });

                });

            });

        });

}).call( this );
