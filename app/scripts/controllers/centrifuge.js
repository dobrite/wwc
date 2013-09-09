(function() {
    'use strict';

    var root = this;

    root.define([
        'centrifuge',
        'backbone',
        'underscore',
        'communicator',
        'sockjs-client'
    ],
    function( Centrifuge, Backbone, _, Communicator ) {

        return Backbone.Marionette.Controller.extend({

            initialize: function( options ) {
                console.log("initialize a Centrifuge Controller");

                this.options = options || {};
            },

            connect: function ( options ) {
                var centrifuge = new Centrifuge.centrifuge({
                    url: 'http://localhost:8000/connection',
                    token: 'bed8d7cfd4f9284afa9c561501cf0f38',
                    project: '522d0945a4dd5f51e5523e59',
                    user: '2694',
                    //protocols_whitelist: ["xhr-streaming"],
                    debug: true
                });


                centrifuge.on('connect', function(){
                    console.log("Yo!");
                });

                centrifuge.connect();
            }

        });

    });
}).call( this );
