define([
    'backbone',
    'hbs!templates/item/login_template'
],
function(Backbone, LoginViewTemplate) {

    return Backbone.Marionette.ItemView.extend({

        initialize: function (options) {
            console.log("initialize a Loginview ItemView");
        },

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
            console.log("loginview close");
        },

        onSubmit: function () {
            var room = this.ui.room.val();
            if (room !== '') {
                this.trigger("login:submit", room);
            }else{
                //TODO show error
            }
        },

    });

});
