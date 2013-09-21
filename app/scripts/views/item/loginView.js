(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'hbs!tmpl/item/loginView_tmpl'
    ],
    function(Backbone, LoginViewTmpl) {

        /* Return a ItemView class definition */
        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log("initialize a Loginview ItemView");
            },

            template: {
                type: 'handlebars',
                template: LoginViewTmpl
            },

            /* ui selector cache */
            ui: {},

            /* Ui events hash */
            events: {},

            /* on render callback */
            onRender: function () {}
        });

    });
}).call(this);
