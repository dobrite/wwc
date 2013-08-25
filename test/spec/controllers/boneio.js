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
                        expect(boneio.socket.connected).to.be.true;
                    });

                    it('communicator should emit an io:connect event on connection', function(){
                        expect(obj.vent.trigger).to.have.been.calledWith('io:connect');
                    });

                });

                describe('connecting functions', function () {
                    var obj = {vent: {trigger: sinon.spy()}};
                    var boneio = new Boneio({communicator: obj});

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
                        expect(boneio.socket.connecting).to.be.true;
                    });

                    it('communicator should emit an io:connecting event on connection', function(){
                        expect(obj.vent.trigger).to.have.been.calledWith('io:connecting');
                    });

                });

                describe('disconnected functions', function () {
                    var obj = {vent: {trigger: sinon.spy()}};
                    var boneio = new Boneio({communicator: obj});

                    beforeEach(function (done) {
                        boneio.connect(socketURL, testOptions);
                        boneio.socket.on('connect', function () {
                            done();
                        });
                    });

                    it('communicator should emit an io:disconnect event when it disconnects', function(done){
                        boneio.socket.on('disconnect', function(data){
                            done();
                        });
                        boneio.disconnect();
                        expect(obj.vent.trigger).to.have.been.calledWith('io:disconnect');
                    });

                });

                describe.only('chat notification functions', function () {

                    var obj1 = {vent: {trigger: sinon.spy()}};
                    var boneio1 = new Boneio({communicator: obj1});
                    var boneio2 = new Boneio({communicator: obj1});

                    beforeEach(function (done) {
                        boneio1.connect(socketURL, testOptions);
                        boneio1.socket.on('connect', function () {
                            done();
                        });
                    });

                    it('socket should be notified when another client connects', function(done){
                        boneio2.connect(socketURL, testOptions);
                        boneio2.socket.on('connect', function(data) {
                            boneio2.socket.on('disconnect', function(data) {
                                expect(obj1.vent.trigger).to.have.been.calledWith('io:join');
                            });
                            boneio2.disconnect();
                        });
                    });

                });

            });

        });

}).call( this );
