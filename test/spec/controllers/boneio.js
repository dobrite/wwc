(function() {
    'use strict';

    var root = this;

    root.define([
        'socketio',
        'controllers/boneio'
        ],
        function( io, Boneio ) {

            describe('Boneio Controller', function () {

                it('should be an instance of Boneio Controller', function () {
                    var boneio = new Boneio({host: 'http://localhost:8080'});
                    expect( boneio ).to.be.an.instanceof( Boneio );
                });

            });

        });

}).call( this );
