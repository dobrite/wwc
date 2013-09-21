(function () {
    'use strict';

    var root = this;

    root.define([
        'views/item/loginView'
        ],
        function (LoginView) {

            describe('LoginView Itemview', function () {

                it('should be an instance of LoginView Itemview', function () {
                    var loginView = new LoginView();
                    expect(loginView).to.be.an.instanceof(LoginView);
                });

                it('should have more test written', function () {
                    expect(false).to.be.ok;
                });
            });

        });

}).call(this);
