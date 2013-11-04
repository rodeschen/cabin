'use strict';
require.config({
    'paths': {
        // Directives
        'cbModule': 'libs/modules/directives/cabin-module/cabin-module',
        'cbSplitter': 'libs/modules/directives/cabin-splitter/cabin-splitter',
        'cbNotify': 'libs/modules/directives/cabin-notify/cabin-notify',
        'cbTopMenu': 'libs/modules/directives/cabin-topMenu/cabin-topMenu',
        'cbSideMenu': 'libs/modules/directives/cabin-sideMenu/cabin-sideMenu',
        'cbPageViewer': 'libs/modules/directives/cabin-pageViewer/cabin-pageViewer',
        // Service
        'cbTxnRouterLoaderService': 'libs/modules/services/cabin-txnRouterLoaderService',
        'cbLazyRegister': 'libs/modules/services/cabin-lazyRegister'
    },
    'shim': {
        'cbSplitter': ['libs', 'cabin'],
        'cbNotify': ['libs', 'cabin'],
        'cbModule': ['libs', 'cabin'],
        'cbLazyRegister': ['libs', 'cabin'],
        'cbTopMenuBar': ['libs', 'cabin'],
        'cbPageViewer': ['libs', 'cabin'],
        'cbSideBar': ['libs', 'cabin'],
        'cbTxnRouterLoaderService': ['libs', 'cabin']
    }
});

define('cabin-libs', ['libs', 'cabin', 'cbLazyRegister', 'cbModule'].concat(properties.useCabinLibs), function(libs, cabin) {
    for (var index = 2; index < arguments.length; index++) {
        var module = arguments[index];
        cabin[module[0]].call(cabin, module[1], module[2]);
    }
    console.log('cabin-libs Initialized');
});
