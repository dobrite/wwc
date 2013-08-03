(function() {
    'use strict';

    var root = this;

    root.define([
        'application'
        ],
        function( Application ) {

            describe('application app', function () {
                it('should be an instance of App Application', function () {
                    //var App = new Application();
                    expect( App ).to.be.an.instanceof( Application );
                });

                it('should have more test written', function(){
                    expect( false ).to.be.ok;
                });
            });

        });

}).call( this );
