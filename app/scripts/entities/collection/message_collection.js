define([
    'backbone',
    'scripts/communicator',
    'scripts/entities/model/message_model',
],
function (Backbone, communicator, MessageModel) {

    var MessageCollection =  Backbone.Collection.extend({
        initialize: function (models, options){
            this.channel = options.channel;

            this.listenToOnce(
                communicator.vent,
                this.channel + ":history",
                this.add
            );

            this.listenTo(
                communicator.vent,
                this.channel + ":join",
                this.add
            );

            this.listenTo(
                communicator.vent,
                this.channel + ":leave",
                this.add
            );

        },

        model: MessageModel,

        comparator: function(m1, m2) {

            var ts1 = m1.get('ts');
            var ts2 = m2.get('ts');

            return (ts1 < ts2)?-1:1;

        },

    });

    return MessageCollection;

});
