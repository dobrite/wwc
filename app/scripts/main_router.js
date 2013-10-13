define([
    'backbone',
],
function (Backbone) {

    var MainRouter = Backbone.Router.extend({

        initialize: function (options) {
            this.options = options || (options = {});
            this.history = options.history || Backbone.history;
        },

        startHistory: function () {
            this.history.start();
        },

        routes: {},

        navigate: function (route, options) {
            options = options || this.options;
            this.history.navigate(route, options);
        },

        getCurrentRoute: function () {
            return this.history.fragment;
        }

    });

    return MainRouter;

});
