define(function() {
    'use strict';

    /* return an array of specs to be run */
    return {
        specs: [
            'spec/testSuite.js',
            'spec/app/app.js',
            'spec/communicator/communicator.js',
            'spec/regionmanager/regionManager.js',
            'spec/regions/chatRegion.js',
            'spec/routers/router.js',
            'spec/views/collection/messages.js',
            'spec/views/item/message.js'
        ]
    };
});
