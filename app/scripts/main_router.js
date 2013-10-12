define([
    'backbone'
],
function(Backbone){

    var MainRouter = Backbone.Router.extend({

        initialize: function () {
            console.log("i");
        },

        routes: {},

        navigate: function (route, options) {
            options = options || {};
            Backbone.history.navigate(route, options);
        },

        getCurrentRoute: function () {
            return Backbone.history.fragment;
        },

    });

    return new MainRouter();
});
