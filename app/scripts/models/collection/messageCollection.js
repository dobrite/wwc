(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/communicator',
        'scripts/models/messageModel',
    ],
    function( Backbone, Communicator, MessageModel ) {

        var MessageCollection =  Backbone.Collection.extend({
            model: MessageModel
        });

        //Communicator.vent.on('ws:');

        return MessageCollection;

    });
}).call(this);
