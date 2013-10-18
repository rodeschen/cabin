'use strict';
require.config({
    'paths': {
        'cbModule': 'libs/modules/directives/cabin-module',
        'cbNotify': 'libs/modules/directives/cabin-notify',
        'cbLazyRegister': 'libs/modules/services/cabin-lazyRegister',
        'cbTopMenuBar' : 'libs/modules/directives/cabin-topMenuBar',
        //'cabin-notify': 'libs/modules/directives/cabin-notify',
        'cabin-txnRouterLoaderService': 'libs/modules/services/cabin-txnRouterLoaderService'
    },
    'shim': {
        'cbNotify': ['libs', 'cabin'],
        'cbModule': ['libs', 'cabin'],
        'cbLazyRegister': ['libs', 'cabin'],
        'cbTopMenuBar' : ['libs', 'cabin'],
        'cabin-txnRouterLoaderService': ['libs', 'cabin']
    }
});

define('cabin-libs', ['libs', 'cabin', 'cbModule', 'cbLazyRegister'].concat(properties.useCabinLibs), function() {
    console.log('cabin-libs Initialized');
});
