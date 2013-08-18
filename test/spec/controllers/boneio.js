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

                it('socket should be connected after calling connect', function(done){
                    var boneio1 = new Boneio();
                    boneio1.connect(socketURL, testOptions);
                    done();
                    expect(boneio1.socket.connected).to.be.true;
                    boneio1.disconnect();
                });

                describe('vent functions', function () {

                    after(function () {
                    });

                    it('communicator should emit an io:connect event on connection', function(done){
                        var obj = {vent: {trigger: sinon.spy()}};
                        var boneio1 = new Boneio({communicator: obj});
                        boneio1.connect(socketURL, testOptions);
                        boneio1.socket.on('connect', function(data){
                            expect(obj.vent.trigger).to.have.been.calledWith('io:connect');
                            done();
                        });
                    });

                    it.skip('socket should be notified when another client connects', function(done){
                        var boneio1 = new Boneio();
                        boneio1.connect(socketURL, testOptions);
                        boneio1.socket.on('connect', function(data){
                            expect(boneio1.socket.connected).to.be.true;
                            done();
                        });
                    });

                });

            });

        });

}).call( this );
