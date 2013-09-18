(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/centrifuge'
        ],
        function( Centrifuge ) {
            var testOptions = {
                url: 'http://localhost:8000/connection',
                token: 'af10cc02d75f6006ae75067623994270',
                project: '5234d3f0a4dd5f3e61942bfb',
                user: '2694',
                //protocols_whitelist: ["xhr-streaming"],
                //debug: true
            };

            var createTestCommunicator = function () {
                return {vent: {trigger: sinon.spy(), on: sinon.spy()}};
            };

            var createTestCentrifuge = function () {
                var testCommunicator = createTestCommunicator();
                var centrifuge = new Centrifuge({communicator: testCommunicator});
                return centrifuge;
            };

            describe('Centrifuge Controller', function () {
                it('should be an instance of Centrifuge Controller', function () {
                    var centrifuge = new Centrifuge();
                    expect( centrifuge ).to.be.an.instanceof( Centrifuge );
                });

                it('initialize should default to empty options', function () {
                    var centrifuge = new Centrifuge();
                    expect( centrifuge.options ).to.be.empty;
                });

                it('initialize should take options', function(){
                    var options = {test: true};
                    var centrifuge = new Centrifuge(options);
                    expect( centrifuge.options ).to.be.equal(options);
                });

                it('merge should merge options', function(){
                    var options = {test: true, nick: "nick"};
                    var centrifuge = new Centrifuge(options);
                    var newOptions = {test: false};
                    var mergedOptions = centrifuge.merge(newOptions);
                    expect(mergedOptions.test).to.be.false;
                });

                it('merge should merge empty options', function(){
                    var centrifuge = new Centrifuge();
                    var mergedOptions = centrifuge.merge();
                    expect(mergedOptions).to.be.empty;
                });

                describe('connected functions', function () {
                    var testCentrifuge = createTestCentrifuge();

                    beforeEach(function (done) {
                        testCentrifuge.connect(testOptions);
                        testCentrifuge.centrifuge.on('connect', function () {
                            done();
                        });
                    });

                    afterEach(function (done) {
                        testCentrifuge.centrifuge.on('disconnect', function () {
                            testCentrifuge.centrifuge.removeEvent();
                            done();
                        });
                        testCentrifuge.disconnect();
                    });

                    it('centrifuge should be connected after calling connect', function () {
                        expect(testCentrifuge.centrifuge.isConnected()).to.be.true;
                    });

                    it('communicator should emit a ws:connect event on connection', function () {
                        testCentrifuge.centrifuge.trigger('connect');
                        expect(testCentrifuge.communicator.vent.trigger).to.calledWith('ws:connect');
                    });
                });

                describe('disconnected functions', function () {
                    var testCentrifuge = createTestCentrifuge();

                    beforeEach(function (done) {
                        testCentrifuge.connect(testOptions);
                        testCentrifuge.centrifuge.on('connect', function () {
                            testCentrifuge.disconnect();
                        });
                        testCentrifuge.centrifuge.on('disconnect', function () {
                            testCentrifuge.centrifuge.removeEvent();
                            done();
                        });
                    });

                    it('centrifuge should not be connected after calling disconnect', function(){
                        expect(testCentrifuge.centrifuge.isConnected()).to.be.false;
                    });

                    it('communicator should emit a ws:disconnect event when it disconnects', function(){
                        expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:disconnect');
                    });

                });

                describe('subscribe functions', function () {
                    var testCentrifuge = createTestCentrifuge();

                    beforeEach(function (done) {
                        testCentrifuge.centrifuge.on('connect', function () {
                            done();
                        });
                        testCentrifuge.connect(testOptions);
                    });

                    afterEach(function () {
                        testCentrifuge.centrifuge.removeEvent();
                    });

                    it('communicator should emit a ws:subscribe:success event when it successfully subscribes', function(done){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.subscription.on('subscribe:success', function () {
                            testCentrifuge.centrifuge.on('disconnect', function () {
                                expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:subscribe:success');
                                done();
                            });
                            testCentrifuge.disconnect();
                        });
                    });

                    it('communicator should emit a ws:subscribe:error event on a subscribe error', function(done){
                        testCentrifuge.subscribe('doesntexist');
                        testCentrifuge.subscription.on('subscribe:error', function () {
                            testCentrifuge.centrifuge.on('disconnect', function () {
                                expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:subscribe:error');
                                done();
                            });
                            testCentrifuge.disconnect();
                        });
                    });

                });

                describe('publish functions', function () {
                    var testCentrifuge = createTestCentrifuge();

                    beforeEach(function (done) {
                        testCentrifuge.centrifuge.on('connect', function () {
                            done();
                        });
                        testCentrifuge.connect(testOptions);
                    });

                    afterEach(function () {
                        testCentrifuge.centrifuge.removeEvent();
                        testCentrifuge.disconnect();
                    });

                    it('communicator should emit a ws:publish:success event when it successfully publishes', function(done){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.subscription.on('subscribe:success', function () {
                            testCentrifuge.subscription.on('publish:success', function () {
                                testCentrifuge.centrifuge.on('disconnect', function () {
                                    expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:publish:success');
                                    done();
                                });
                                testCentrifuge.disconnect();
                            });
                            testCentrifuge.publish('test message');
                        });
                    });

                    it('communicator should emit a ws:publish:error event on a publish error', function(done){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.subscription.on('subscribe:success', function () {
                            testCentrifuge.subscription.trigger('publish:error');
                            expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:publish:error');
                            done();
                        });
                    });
                });

                describe('presence functions', function () {
                    var testCentrifuge = createTestCentrifuge();

                    beforeEach(function (done) {
                        testCentrifuge.centrifuge.on('connect', function () {
                            done();
                        });
                        testCentrifuge.connect(testOptions);
                    });

                    afterEach(function () {
                        testCentrifuge.centrifuge.removeEvent();
                        testCentrifuge.disconnect();
                    });

                    it('communicator should emit a ws:presence:success event when it successfully presences', function(done){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.subscription.on('subscribe:success', function () {
                            testCentrifuge.subscription.on('presence:success', function () {
                                testCentrifuge.centrifuge.on('disconnect', function () {
                                    expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:presence:success');
                                    done();
                                });
                                testCentrifuge.disconnect();
                            });
                            testCentrifuge.presence();
                        });
                    });

                    it('communicator should emit a ws:presence:error event on a presence error', function(done){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.subscription.on('subscribe:success', function () {
                            testCentrifuge.subscription.trigger('presence:error');
                            expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:presence:error');
                            done();
                        });
                    });
                });

                describe('history functions', function () {
                    var testCentrifuge = createTestCentrifuge();

                    beforeEach(function (done) {
                        testCentrifuge.centrifuge.on('connect', function () {
                            done();
                        });
                        testCentrifuge.connect(testOptions);
                    });

                    afterEach(function () {
                        testCentrifuge.centrifuge.removeEvent();
                        testCentrifuge.disconnect();
                    });

                    it('communicator should emit a ws:history:success event when it successfully get history', function(done){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.subscription.on('subscribe:success', function () {
                            testCentrifuge.subscription.on('history:success', function () {
                                testCentrifuge.centrifuge.on('disconnect', function () {
                                    expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:history:success');
                                    done();
                                });
                                testCentrifuge.disconnect();
                            });
                            testCentrifuge.history();
                        });
                    });

                    it('communicator should emit a ws:history:error event on a history error', function(done){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.subscription.on('subscribe:success', function () {
                            testCentrifuge.subscription.trigger('history:error');
                            expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:history:error');
                            done();
                        });
                    });
                });

                describe('message functions', function () {
                    var testCentrifuge = createTestCentrifuge();

                    beforeEach(function (done) {
                        testCentrifuge.centrifuge.on('connect', function () {
                            done();
                        });
                        testCentrifuge.connect(testOptions);
                    });

                    afterEach(function () {
                        testCentrifuge.disconnect();
                    });

                    it('communicator should emit a ws:message event when it receives a message', function(){
                        testCentrifuge.subscribe('test:test');
                        testCentrifuge.presence();
                        testCentrifuge.subscription.trigger('message');
                        expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:message');
                    });
                });

            });
        });

}).call( this );
