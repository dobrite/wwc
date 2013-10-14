define([
    'backbone',
    'scripts/communicator',
    'scripts/models/nick_model',
],
function (Backbone, Communicator, NickModel) {

    var NickCollection =  Backbone.Collection.extend({
        model: NickModel
    });

    //Communicator.vent.on('ws:');

    return NickCollection;

});
