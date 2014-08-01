'use strict';
require.config({
    'paths': {
        // Directives
        'cbBehavior': 'libs/modules/directives/cabin-behavior/cabin-behavior',
        'cbModule': 'libs/modules/directives/cabin-module/cabin-module',
        'cbSplitter': 'libs/modules/directives/cabin-splitter/cabin-splitter',
        'cbNotify': 'libs/modules/directives/cabin-notify/cabin-notify',
        'cbTopMenu': 'libs/modules/directives/cabin-topMenu/cabin-topMenu',
        'cbSideMenu': 'libs/modules/directives/cabin-sideMenu/cabin-sideMenu',
        'cbPageViewer': 'libs/modules/directives/cabin-pageViewer/cabin-pageViewer',
        'cbGrid': 'libs/modules/directives/cabin-grid/cabin-grid',
        'cbComboBox': 'libs/modules/directives/cabin-comboBox/cabin-comboBox',
        'cbMaskNumber': 'libs/modules/directives/cabin-mask/cabin-mask-number',
        'cbSocketStatus': 'libs/modules/directives/cabin-socketStatus/cabin-socketStatus',
        // Service
        'cbTxnRouterLoaderServ': 'libs/modules/services/cabin-txnRouterLoaderServ',
        'cbLazyRegisterServ': 'libs/modules/services/cabin-lazyRegisterServ',
        'cbComboBoxServ': 'libs/modules/services/cabin-comboBoxServ',
        'cbUtils': 'libs/modules/services/cabin-utils',
        'cbWebSocketIoServ': 'libs/modules/services/cabin-websocket-io',
        // Modal
        'cbSupeviseModal': 'libs/modules/modals/cabin-supeviseModal/cabin-supeviseModal',
        'cbSupeviseRequireModal': 'libs/modules/modals/cabin-supeviseRequireModal/cabin-supeviseRequireModal',
        'cbDeviceAgent': 'libs/modules/services/cabin-deviceAgent/cabin-deviceAgent',
        'cbValidationServ': 'libs/modules/services/cabin-validation',
        'cbCommonModal': 'libs/modules/modals/cabin-commonModal/cabin-commonModal',
        'cbEjContextModal': 'libs/modules/modals/cabin-ejContextModal/cabin-ejContextModal',
        'cbOpenTxnModal': 'libs/modules/modals/cabin-openTxnModal/cabin-openTxnModal',
        //for poc
        'iBranchServ': 'scripts/services/iBranchServ',
        'userServ': 'scripts/services/userServ',
        'cbTest': 'libs/modules/directives/cabin-test/cabin-test'
    },
    'shim': {
        'cbBehavior': ['libs', 'cabin'],
        'cbSplitter': ['libs', 'cabin'],
        'cbNotify': ['libs', 'cabin'],
        'cbComboBox': ['libs', 'cabin'],
        'cbModule': ['libs', 'cabin'],
        'cbTopMenuBar': ['libs', 'cabin'],
        'cbPageViewer': ['libs', 'cabin'],
        'cbSideBar': ['libs', 'cabin'],
        //service
        'cbTxnRouterLoaderServ': ['libs', 'cabin'],
        'cbLazyRegisterServ': ['libs', 'cabin'],
        'cbValidationServ': ['libs', 'cabin'],
        'cbComboBoxServ' : ['libs', 'cabin'],
        //modal
        'cbSupeviseModal': ['libs', 'cabin'],
        'cbSupeviseRequireModal': ['libs', 'cabin'],
        //deviceAgent
        'cbDeviceAgent': ['libs', 'cabin'],
        'iBranchServ': ['libs', 'cabin'],
        'userServ': ['libs', 'cabin', 'iBranchServ']
    }
});

define('cabin-libs', ['libs', 'cabin', 'cbLazyRegisterServ', 'cbModule',
    'cbBehavior',
    'cbUtils',
    'cbComboBox',
    'cbSplitter',
    'cbMaskNumber',
    'cbTxnRouterLoaderServ',
    'cbComboBoxServ',
    'cbWebSocketIoServ',
    'cbCommonModal',
    'cbEjContextModal',
    'cbGrid',
    'cbOpenTxnModal',
    //for poc
    'cbValidationServ',
    'cbDeviceAgent',
    'iBranchServ',
    'userServ',
    //modal 
    'cbSupeviseModal',
    'cbSupeviseRequireModal'
], function(libs, cabin) {
    var args = $.makeArray(arguments).slice(0);
    for (var index = 2; index < args.length; index++) {
        var modules = args[index];
        if (modules && modules[0] && modules[0].constructor === String) {
            modules = [modules];
        }
        angular.forEach(modules, function(value, key) {
            cabin[value[0]].call(cabin, value[1], value[2]);
        });

    }
    console.log('cabin-libs Initialized');
});
