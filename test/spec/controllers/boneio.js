(function() {
    'use strict';

    var root = this;

    root.define([
        'controllers/boneio'
        ],
        function( Boneio ) {

            describe('Boneio Controller', function () {

                it('should be an instance of Boneio Controller', function () {
                    console.log(sinon);
                    var io = sinon.spy();
                    var boneio = new Boneio({io: io});
                    expect( boneio ).to.be.an.instanceof( Boneio );
                });

                it('should have more test written', function(){
                    expect( false ).to.be.ok;
                });
            });

        });

}).call( this );
