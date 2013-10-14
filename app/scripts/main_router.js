define([
    'backbone',
    'scripts/communicator',
],
function (Backbone, communicator) {

    var MainRouter = Backbone.Router.extend({

        initialize: function (options) {
            this.options = options || (options = {});
            this.history = options.history || Backbone.history;
            this.communicator = options.communicator || communicator;

            this.setCommunicatorHandlers();
        },

        startHistory: function () {
            console.log("starting history");
            this.history.start();
        },

        routes: {},

        navigate: function (route, options) {
            options = options || this.options;
            this.history.navigate(route, options);
        },

        getCurrentRoute: function () {
            return this.history.fragment;
        },

        setCommunicatorHandlers: function () {

            this.communicator.reqres.setHandler("router:route", function () {
                return this.getCurrentRoute();
            }, this);

            this.communicator.command.setHandler("router:history:start", function () {
                this.startHistory();
            }, this);

            this.communicator.command.setHandler("router:navigate", function (route, options) {
                this.navigate(route, options);
            }, this);

        },

    });

    return MainRouter;

});
