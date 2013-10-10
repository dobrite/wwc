(function () {
    'use strict';

    var root = this;

    root.define([
        'backbone',
        'scripts/communicator',
        'hbs!templates/item/inputViewTemplate'
    ],
    function(Backbone, Communicator, InputViewTemplate) {

        return Backbone.Marionette.ItemView.extend({

            initialize: function () {
                console.log("initialize a inputView ItemView");
            },

            template: {
                type: 'handlebars',
                template: InputViewTemplate
            },

            ui: {
                input: ".js-input"
            },

            events: {
                "click .js-input-btn": "inputSubmit"
            },

            /* on render callback */
            onRender: function () {},

            inputSubmit: function (event) {
                var chatMessage = this.ui.input.val();

                if(chatMessage !== ''){
                    console.log(chatMessage);
                }
            },

        });

    });
}).call(this);
