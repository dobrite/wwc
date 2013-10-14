(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!templates/item/loginView_tmpl'
    ],
    function(Backbone, LoginViewTemplate) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log("initialize a Loginview ItemView");
            },

            template: {
                type: 'handlebars',
                template: LoginViewTemplate
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {
                "click .js-submit": "loginSubmit"
            },

            /* on render callback */
            onRender: function () {},

            loginSubmit: function (event) {
                event.preventDefault();
                this.trigger("login:submit");
            },
        });

    });
}).call(this);
