define([
    'backbone',
    'hbs!templates/item/login_template'
],
function(Backbone, LoginViewTemplate) {

    return Backbone.Marionette.ItemView.extend({

        initialize: function () {
            console.log("initialize a Loginview ItemView");
        },

        template: {
            type: 'handlebars',
            template: LoginViewTemplate
        },

        ui: {
            nick: ".js-nick"
        },

        events: {
            "click .js-submit": "loginSubmit"
        },

        onRender: function () {},

        onClose: function () {
            console.log("loginview close");
        },

        loginSubmit: function (event) {
            event.preventDefault();
            this.trigger("login:submit");
        },
    });

});
