(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone'
        ],
        function(Backbone){

            return Backbone.Router.extend({
                /* Backbone routes hash */
                routes: {}
            });
    });
}).call( this );
