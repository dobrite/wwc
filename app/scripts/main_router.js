(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone'
    ],
    function(Backbone){

        var MainRouter = Backbone.Router.extend({
            routes: {},

            navigate: function (route, options) {
                options = options || {};
                Backbone.history.navigate(route, options);
            },

            getCurrentRoute: function () {
                return Backbone.history.fragment;
            },

        });

        return new MainRouter();
    });
}).call(this);
