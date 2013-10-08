(function () {
    'use strict';

    var root = this;

    root.define([
        'scripts/controllers/loginController'
        ],
        function(LoginController) {

            describe('LoginController Controller', function () {

                it('should be an instance of Logincontroller Controller', function () {
                    var loginController = new LoginController();
                    expect(loginController).to.be.an.instanceof(LoginController);
                });

                it('should have more test written', function (){
                    expect( false ).to.be.ok;
                });
            });

        });

}).call(this);
