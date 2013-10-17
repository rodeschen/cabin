'use strict';
require.config({
    'paths': {
        'cabin-notify': 'libs/modules/directives/cabin-notify',
        'cabin-txnRouterLoaderService' : 'libs/modules/services/cabin-txnRouterLoaderService'
    },
    'shim': {
        'cabin-notify': ['libs', 'cabin'],
      	'cabin-txnRouterLoaderService': ['libs', 'cabin'],
    }
});

define('cabin-libs', ['libs', 'cabin'].concat(properties.useCabinLibs), function() {
    console.log('cabin-libs Initialized');
});
