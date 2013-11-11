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
        'cbComboBox': 'libs/modules/directives/cabin-comboBox/cabin-comboBox',
        // Service
        'cbTxnRouterLoaderServ': 'libs/modules/services/cabin-txnRouterLoaderServ',
        'cbLazyRegisterServ': 'libs/modules/services/cabin-lazyRegisterServ',
        'cbComboBoxServ': 'libs/modules/services/cabin-comboBoxServ'

    },
    'shim': {
        'cbSplitter': ['libs', 'cabin'],
        'cbNotify': ['libs', 'cabin'],
        'cbModule': ['libs', 'cabin'],
        'cbTopMenuBar': ['libs', 'cabin'],
        'cbPageViewer': ['libs', 'cabin'],
        'cbSideBar': ['libs', 'cabin'],
        //service
        'cbTxnRouterLoaderServ': ['libs', 'cabin'],
        'cbLazyRegisterServ': ['libs', 'cabin']
    }
});

define('cabin-libs', ['libs', 'cabin', 'cbLazyRegisterServ', 'cbModule'].concat(properties.useCabinLibs), function(libs, cabin) {
    for (var index = 2; index < arguments.length; index++) {
        var modules = arguments[index];
        if(modules[0].constructor === String){
            modules = [modules];
        }
        angular.forEach(modules, function(value, key){
            cabin[value[0]].call(cabin, value[1], value[2]);    
        });
        
    }
    console.log('cabin-libs Initialized');
});
