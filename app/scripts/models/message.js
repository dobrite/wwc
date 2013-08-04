(function() {
    'use strict';

    var root = this;

    root.define([
        'backbone'
        ],
        function( Backbone ) {

            return Backbone.Model.extend({
                initialize: function() {
                    console.log("initialize a Message model");
                },

                defaults: {
                    nick: '',
                    text: ''
                }

        });
    });
}).call( this );
