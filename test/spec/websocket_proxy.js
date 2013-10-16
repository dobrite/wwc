require([
    'scripts/websocket_proxy'
],
function (WebsocketProxy) {
    var testOptions = {
        namespace: 'test',
        url: 'http://localhost:8000/connection',
        token: '15f928437b0fa1fdd58921f19c854f29',
        project: '52522b73a4dd5f27c53999d6',
        user: '2694',
        //protocols_whitelist: ["xhr-streaming"],
        debug: true
    };

    var createTestCommunicator = function () {
        return {
            vent: {
                trigger: sinon.spy(),
                on: sinon.spy()
            },
            command: {
                setHandler: sinon.spy()
            }
        };
    };

    var createTestWebsocketProxy = function () {
        var testCommunicator = createTestCommunicator();
        return new WebsocketProxy({communicator: testCommunicator});
    };

    describe('WebsocketProxy Controller', function () {
        it('should be an instance of WebsocketProxy Controller', function () {
            var websocketProxy = new WebsocketProxy();
            expect(websocketProxy).to.be.an.instanceof(WebsocketProxy);
        });

        it('initialize should default to empty options', function () {
            var websocketProxy = new WebsocketProxy();
            expect(websocketProxy.options).to.be.empty;
        });

        it('initialize should take options', function () {
            var options = {test: true};
            var websocketProxy = new WebsocketProxy(options);
            expect(websocketProxy.options).to.be.equal(options);
        });

        describe('connected functions', function () {
            var testWebsocketProxy = createTestWebsocketProxy();

            beforeEach(function (done) {
                testWebsocketProxy.centrifuge.on('connect', function () {
                    done();
                });
                testWebsocketProxy.connect(testOptions);
            });

            afterEach(function (done) {
                testWebsocketProxy.centrifuge.on('disconnect', function () {
                    testWebsocketProxy.centrifuge.removeEvent();
                    done();
                });
                testWebsocketProxy.disconnect();
            });

            it('centrifuge should be connected after calling connect', function () {
                expect(testWebsocketProxy.centrifuge.isConnected()).to.be.true;
            });

            it('communicator should emit a ws:connect event on connection', function () {
                testWebsocketProxy.centrifuge.trigger('connect');
                expect(testWebsocketProxy.communicator.vent.trigger).to.calledWith('ws:connect');
            });
        });

        describe('disconnected functions', function () {
            var testWebsocketProxy = createTestWebsocketProxy();

            beforeEach(function (done) {
                testWebsocketProxy.connect(testOptions);
                testWebsocketProxy.centrifuge.on('connect', function () {
                    testWebsocketProxy.disconnect();
                });
                testWebsocketProxy.centrifuge.on('disconnect', function () {
                    testWebsocketProxy.centrifuge.removeEvent();
                    done();
                });
            });

            it('centrifuge should not be connected after calling disconnect', function(){
                expect(testWebsocketProxy.centrifuge.isConnected()).to.be.false;
            });

            it('communicator should emit a ws:disconnect event when it disconnects', function(){
                expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:disconnect');
            });

        });

        describe('subscribe functions', function () {
            var testWebsocketProxy = createTestWebsocketProxy();

            beforeEach(function (done) {
                testWebsocketProxy.centrifuge.on('connect', function () {
                    done();
                });
                testWebsocketProxy.connect(testOptions);
            });

            afterEach(function () {
                testWebsocketProxy.centrifuge.removeEvent();
            });

            it('communicator should emit a ws:subscribe:success event when it successfully subscribes', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('subscribe:success', function () {
                    testWebsocketProxy.centrifuge.on('disconnect', function () {
                        expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:subscribe:success');
                        done();
                    });
                    testWebsocketProxy.disconnect();
                });
            });

            it('communicator should emit a ws:ready event when it successfully subscribes', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('ready', function () {
                    testWebsocketProxy.centrifuge.on('disconnect', function () {
                        expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:ready');
                        done();
                    });
                    testWebsocketProxy.disconnect();
                });
            });

            it('communicator should emit a ws:subscribe:error event on a subscribe error', function(done){
                testWebsocketProxy.subscribe({namespace: 'doesntexist', channel: 'doesntexist'});
                testWebsocketProxy.subscription.on('subscribe:error', function () {
                    testWebsocketProxy.centrifuge.on('disconnect', function () {
                        expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:subscribe:error');
                        done();
                    });
                    testWebsocketProxy.disconnect();
                });
            });

        });

        describe('publish functions', function () {
            var testWebsocketProxy = createTestWebsocketProxy();

            beforeEach(function (done) {
                testWebsocketProxy.centrifuge.on('connect', function () {
                    done();
                });
                testWebsocketProxy.connect(testOptions);
            });

            afterEach(function () {
                testWebsocketProxy.centrifuge.removeEvent();
                testWebsocketProxy.disconnect();
            });

            it('communicator should emit a ws:publish:success event when it successfully publishes', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('subscribe:success', function () {
                    testWebsocketProxy.subscription.on('publish:success', function () {
                        testWebsocketProxy.centrifuge.on('disconnect', function () {
                            expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:publish:success');
                            done();
                        });
                        testWebsocketProxy.disconnect();
                    });
                    testWebsocketProxy.publish('test message');
                });
            });

            it('communicator should emit a ws:publish:error event on a publish error', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('subscribe:success', function () {
                    testWebsocketProxy.subscription.trigger('publish:error');
                    expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:publish:error');
                    done();
                });
            });
        });

        describe('presence functions', function () {
            var testWebsocketProxy = createTestWebsocketProxy();

            beforeEach(function (done) {
                testWebsocketProxy.centrifuge.on('connect', function () {
                    done();
                });
                testWebsocketProxy.connect(testOptions);
            });

            afterEach(function () {
                testWebsocketProxy.centrifuge.removeEvent();
                testWebsocketProxy.disconnect();
            });

            it('communicator should emit a ws:presence:success event when it successfully presences', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('subscribe:success', function () {
                    testWebsocketProxy.subscription.on('presence:success', function () {
                        testWebsocketProxy.centrifuge.on('disconnect', function () {
                            expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:presence:success');
                            done();
                        });
                        testWebsocketProxy.disconnect();
                    });
                    testWebsocketProxy.presence();
                });
            });

            it('communicator should emit a ws:presence:error event on a presence error', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('subscribe:success', function () {
                    testWebsocketProxy.subscription.trigger('presence:error');
                    expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:presence:error');
                    done();
                });
            });
        });

        describe('history functions', function () {
            var testWebsocketProxy = createTestWebsocketProxy();

            beforeEach(function (done) {
                testWebsocketProxy.centrifuge.on('connect', function () {
                    done();
                });
                testWebsocketProxy.connect(testOptions);
            });

            afterEach(function () {
                testWebsocketProxy.centrifuge.removeEvent();
                testWebsocketProxy.disconnect();
            });

            it('communicator should emit a ws:history:success event when it successfully get history', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('subscribe:success', function () {
                    testWebsocketProxy.subscription.on('history:success', function () {
                        testWebsocketProxy.centrifuge.on('disconnect', function () {
                            expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:history:success');
                            done();
                        });
                        testWebsocketProxy.disconnect();
                    });
                    testWebsocketProxy.history();
                });
            });

            it('communicator should emit a ws:history:error event on a history error', function(done){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.on('subscribe:success', function () {
                    testWebsocketProxy.subscription.trigger('history:error');
                    expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:history:error');
                    done();
                });
            });
        });

        describe('message functions', function () {
            var testWebsocketProxy = createTestWebsocketProxy();

            beforeEach(function (done) {
                testWebsocketProxy.centrifuge.on('connect', function () {
                    done();
                });
                testWebsocketProxy.connect(testOptions);
            });

            afterEach(function () {
                testWebsocketProxy.disconnect();
            });

            it('communicator should emit a ws:message event when it receives a message', function(){
                testWebsocketProxy.subscribe({channel: 'test'});
                testWebsocketProxy.subscription.trigger('message');
                expect(testWebsocketProxy.communicator.vent.trigger).to.have.been.calledWith('ws:message');
            });
        });

    });
});
