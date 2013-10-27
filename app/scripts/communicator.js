define([
    'backbone',
],
function (Backbone) {

    var Communicator = Backbone.Marionette.Controller.extend({

        initialize: function (options) {

            this.vent = new Backbone.Wreqr.EventAggregator();
            this.reqres = new Backbone.Wreqr.RequestResponse();
            this.command = new Backbone.Wreqr.Commands();

        }

    });

    return new Communicator();
});
