(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone'
        ],
        function( Backbone ) {

            return Backbone.Model.extend({
                defaults: {
                    nick: '',
                    text: '',
                },

        });
    });
}).call( this );
