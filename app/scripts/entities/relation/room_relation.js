define([
    'backbone',
    'scripts/entities/model/user_model',
    'scripts/entities/collection/user_collection',
    'scripts/entities/model/message_model',
    'scripts/entities/collection/message_collection',
    'backbone-relational',
],
function (Backbone, UserModel, UserCollection, MessageModel, MessageCollection) {

    var RoomRelationalModel = Backbone.RelationalModel.extend({

        relations: [{
            type: Backbone.HasMany,
            key: 'users',
            relatedModel: UserModel,
            collectionType: UserCollection,
            reverseRelation: {
                key: 'inRoom',
            }
        },{
            type: Backbone.HasMany,
            key: 'messages',
            relatedModel: MessageModel,
            collectionType: MessageCollection,
            reverseRelation: {
                key: 'inRoom',
            }
        }],

    });

    return RoomRelationalModel;

});
