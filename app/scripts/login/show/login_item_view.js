define([
    'backbone',
    'hbs!templates/item/login_template'
],
function(Backbone, LoginViewTemplate) {

    return Backbone.Marionette.ItemView.extend({

        className: "row",

        initialize: function (options) {},

        template: {
            type: 'handlebars',
            template: LoginViewTemplate
        },

        ui: {
            room: ".js-room",
        },

        events: {},

        triggers: {
            "click .js-submit": "submit",
        },

        onRender: function () {},

        onClose: function () {
        },

        onSubmit: function () {

            var room = this.ui.room.val();
            if (room !== '') {
                this.trigger("login:submit", room);
            }

        },

    });

});
