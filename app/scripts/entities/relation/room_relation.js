define([
    'backbone',
    'scripts/entities/relation/user_relation',
    'scripts/entities/collection/user_collection',
    'scripts/entities/relation/message_relation',
    'scripts/entities/collection/message_collection',
],
function (Backbone, UserRelationalModel, UserCollection, MessageRelationalModel, MessageCollection) {

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
            relatedModel: MessageRelationalModel,
            collectionType: MessageCollection,
            reverseRelation: {
                key: 'inRoom',
            }
        }],

    });

    return RoomRelationalModel;

});
