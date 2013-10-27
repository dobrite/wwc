define([
    'backbone',
    'moment',
    'scripts/entities/relation/user_relation',
],
function (Backbone, moment, UserRelationalModel) {

    return Backbone.RelationalModel.extend({

        relations: [{
            type: Backbone.HasOne,
            key: 'user',
            relatedModel: UserRelationalModel,
            reverseRelation: {
                type: Backbone.HasMany,
                key: 'messages'
            }
        }],

        initialize: function(data, options) {
            this.set("id", data.uid);
            //this.set("user_id", data.client_id);
        },

        defaults: {
            //ts: moment().format("HH:mm"),
            //nick: '',
            //text: '',
        },

    });

});
