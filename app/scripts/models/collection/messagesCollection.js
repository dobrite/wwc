(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/models/messageModel',
    ],
    function( Backbone, MessageModel ) {

        return Backbone.Collection.extend({
            model: MessageModel
        });

    });
}).call(this);
