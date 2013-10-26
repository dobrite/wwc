define([
    'backbone',
    'scripts/entities/relation/user_relation',
    'scripts/entities/collection/user_collection',
    'scripts/entities/model/message_model',
    'scripts/entities/collection/message_collection',
],
function (Backbone, UserRelationalModel, UserCollection, MessageModel, MessageCollection) {

    var RoomRelationalModel = Backbone.RelationalModel.extend({

        relations: [{
            type: Backbone.HasMany,
            key: 'users',
            relatedModel: UserRelationalModel,
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
