define(function() {
    'use strict';

    /* return an array of specs to be run */
    return {
        specs: [
            'spec/app/app.js',
            'spec/communicator/communicator.js',
            'spec/controllers/boneio.js',
            'spec/controllers/chat.js',
            'spec/models/message.js',
            'spec/regionmanager/regionManager.js',
            'spec/regions/chatRegion.js',
            'spec/routers/router.js',
            'spec/views/collection/messagesCollectionView.js',
            'spec/views/item/messageItemView.js'
        ]
    };
});
