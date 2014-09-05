'use strict';
require.config({
    'paths': {
        'cabinCoreModule': 'libs/modules/core/module',
        'cbLazyInitialServ': 'libs/modules/core/cabin-lazyInitialServ',
        'cbModule': 'libs/modules/core/cabin-module',
        'cbTxnRouterLoaderServ': 'libs/modules/core/cabin-txnRouterLoaderServ',
        'cbLazyRegisterServ': 'libs/modules/core/cabin-lazyRegisterServ'
    },
    'shim': {
        'cbModule': ['libs', 'cabinCoreModule'],
        'cbTxnRouterLoaderServ': ['libs', 'cabinCoreModule'],
        'cbLazyRegisterServ': ['libs', 'cabinCoreModule'],
        'cbLazyInitialServ': ['libs', 'cabinCoreModule']
    }
});


define('cabin-core', ['libs', 'cabinCoreModule', 'cbLazyRegisterServ', 'cbModule', 'cbTxnRouterLoaderServ', 'cbLazyInitialServ'], function() {
    console.log('cabin-core-libs Initialized');
});
