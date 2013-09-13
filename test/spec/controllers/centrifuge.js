(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/centrifuge'
        ],
        function( Centrifuge ) {
            var testOptions = {
                url: 'http://localhost:8000/connection',
                token: '2aaedeeddb1ba071de8fe8a7028dd6cf',
                project: '52327c27a4dd5f2c74c3c15e',
                user: '2694',
                //protocols_whitelist: ["xhr-streaming"],
                debug: true
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
                            done();
                        });
                        testCentrifuge.disconnect();
                    });

                    it('centrifuge should be connected after calling connect', function () {
                        expect(testCentrifuge.centrifuge.isConnected()).to.be.true;
                    });

                    it('communicator should emit a ws:connect event on connection', function () {
                        expect(testCentrifuge.communicator.vent.trigger).to.have.been.calledWith('ws:connect');
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

            });
        });

}).call( this );
