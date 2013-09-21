(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone'
    ],
    function(Backbone){
        return Backbone.View.extend({
            initialize: function() {
                console.log("initialize a Loginview View");
            }
        });
    });
}).call(this);
