(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/boneio'
        ],
        function( Boneio ) {

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

                it.skip('communicator should emit an io:connect event on connection', function(done){
                    var boneio1 = new Boneio();
                    boneio1.connect(socketURL, testOptions);
                    boneio1.socket.on('connect', function(data){
                        expect(boneio1.socket.connected).to.be.true;
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

}).call( this );
