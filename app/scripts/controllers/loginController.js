(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone'
    ],
    function(Backbone) {

        return Backbone.Marionette.Controller.extend({

            initialize: function(options) {
                console.log("initialize a LoginController Controller");
            }

        });

    });
}).call(this);
