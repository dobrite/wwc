(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/boneio',
        'communicator'
        ],
        function( Boneio, Communicator ) {

            var socketURL = 'http://localhost:8080';

            var testOptions = {
                transports: ['websocket'],
                'force new connection': true,
                'reconnect': false
            };

            var createTestCommunicator = function () {
                return {vent: {trigger: sinon.spy(), on: sinon.spy()}};
            };

            var createTestBoneio = function () {
                var boneio = new Boneio();
                boneio.setCommunicator(createTestCommunicator());
                return boneio;
            };

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

                it('setCommunicator should take a custom communicator', function(){
                    var testCom = createTestCommunicator();
                    var boneio = new Boneio();
                    boneio.setCommunicator(testCom);
                    expect( boneio.communicator ).to.be.equal(testCom);
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
                    var boneio = createTestBoneio();

                    beforeEach(function (done) {
                        boneio.connect(socketURL, testOptions);
                        boneio.socket.on('connect', function () {
                            done();
                        });
                    });

                    afterEach(function (done) {
                        boneio.socket.on('disconnect', function () {
                            done();
                        });
                        boneio.disconnect();
                    });

                    it('socket should be connected after calling connect', function(){
                        expect(boneio.socket.socket.connected).to.be.true;
                    });

                    it('communicator should emit an io:connect event on connection', function(){
                        expect(boneio.communicator.vent.trigger).to.have.been.calledWith('io:connect');
                    });

                });

                describe('connecting functions', function () {
                    var boneio = createTestBoneio();

                    beforeEach(function (done) {
                        boneio.connect(socketURL, testOptions);
                        boneio.socket.on('connecting', function () {
                            done();
                        });
                    });

                    afterEach(function (done) {
                        boneio.socket.on('connect', function () {
                            boneio.disconnect();
                        });

                        boneio.socket.on('disconnect', function () {
                            done();
                        });
                    });

                    it('socket should be connecting after calling connect', function(){
                        expect(boneio.socket.socket.connecting).to.be.true;
                    });

                    it('communicator should emit an io:connecting event on connection', function(){
                        expect(boneio.communicator.vent.trigger).to.have.been.calledWith('io:connecting');
                    });

                });

                describe('disconnected functions', function () {
                    var boneio = createTestBoneio();

                    beforeEach(function (done) {
                        boneio.connect(socketURL, testOptions);
                        boneio.socket.on('connect', function () {
                            done();
                        });
                    });

                    it('socket should not be connected after calling connect', function(done){
                        boneio.socket.on('disconnect', function(data){
                            expect(boneio.socket.socket.connected).to.be.false;
                            done();
                        });
                        boneio.disconnect();
                    });

                    it('communicator should emit an io:disconnect event when it disconnects', function(done){
                        boneio.socket.on('disconnect', function(data){
                            done();
                        });
                        boneio.disconnect();
                        expect(boneio.communicator.vent.trigger).to.have.been.calledWith('io:disconnect');
                    });

                });

                describe('chat notification functions', function () {

                    var boneio1 = createTestBoneio();
                    var boneio2 = new Boneio();
                    boneio2.setCommunicator(Communicator);

                    beforeEach(function (done) {
                        boneio1.connect(socketURL, testOptions);
                        boneio1.socket.on('connect', function () {
                            done();
                        });
                    });

                    afterEach(function (done) {
                        boneio1.socket.on('disconnect', function () {
                            done();
                        });
                        boneio1.disconnect();
                    });

                    it('socket should be notified when another client connects', function(done){
                        boneio2.connect(socketURL, testOptions);
                        boneio2.socket.on('connect', function(data) {
                            boneio2.socket.on('disconnect', function () {
                                done();
                            });
                        });
                        boneio1.socket.on('join', function(data) {
                            expect(boneio1.communicator.vent.trigger).to.have.been.calledWith('io:join');
                            boneio2.disconnect();
                        });
                    });

                });

                describe('chat message functions', function () {

                    var boneio1 = new Boneio();
                    boneio1.setCommunicator();
                    var boneio2 = createTestBoneio();
                    var boneio3 = createTestBoneio();

                    beforeEach(function (done) {
                        boneio1.connect(socketURL, testOptions);
                        boneio1.socket.on('connect', function () {
                            boneio2.connect(socketURL, testOptions);
                            boneio2.socket.on('connect', function(data) {
                                boneio3.connect(socketURL, testOptions);
                                boneio3.socket.on('connect', function(data) {
                                    done();
                                });
                            });
                        });
                    });

                    afterEach(function (done) {
                        boneio1.socket.on('disconnect', function () {
                            boneio2.socket.on('disconnect', function () {
                                boneio3.socket.on('disconnect', function () {
                                    done();
                                });
                                boneio3.disconnect();
                            });
                            boneio2.disconnect();
                        });
                        boneio1.disconnect();
                    });

                    it('all sockets should be notified when another client sends a chat message', function(done){
                        boneio1.socket.on('chatMessage', function () {
                            boneio2.socket.on('chatMessage', function () {
                                boneio3.socket.on('chatMessage', function () {
                                    expect(boneio2.communicator.vent.trigger).to.have.been.calledWith('io:recvChatMessage', "chat");
                                    expect(boneio3.communicator.vent.trigger).to.have.been.calledWith('io:recvChatMessage', "chat");
                                    done();
                                });
                            });
                        });
                        boneio1.communicator.vent.trigger('io:sendChatMessage', "chat");
                    });

                });

            });

        });

}).call( this );
