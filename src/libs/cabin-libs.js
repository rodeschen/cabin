'use strict';
require.config({
    'paths': {
        'cbSplitter' : 'libs/modules/directives/cabin-splitter',
        'cbModule': 'libs/modules/directives/cabin-module',
        'cbNotify': 'libs/modules/directives/cabin-notify',
        'cbLazyRegister': 'libs/modules/services/cabin-lazyRegister',
        'cbTopMenuBar' : 'libs/modules/directives/cabin-topMenuBar',
        'cbSideBar' : 'libs/modules/directives/cabin-sideBar',
        //'cabin-notify': 'libs/modules/directives/cabin-notify',
        'cbTxnRouterLoaderService': 'libs/modules/services/cabin-txnRouterLoaderService'
    },
    'shim': {
        'cbSplitter': ['libs', 'cabin'],
        'cbNotify': ['libs', 'cabin'],
        'cbModule': ['libs', 'cabin'],
        'cbLazyRegister': ['libs', 'cabin'],
        'cbTopMenuBar' : ['libs', 'cabin'],
        'cbTxnRouterLoaderService': ['libs', 'cabin']
    }
});

define('cabin-libs', ['libs', 'cabin', 'cbModule', 'cbLazyRegister'].concat(properties.useCabinLibs), function() {
    console.log('cabin-libs Initialized');
});
