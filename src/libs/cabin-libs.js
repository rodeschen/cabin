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
        'cbSupeviseRequireModal' : 'libs/modules/modals/cabin-supeviseRequireModal/cabin-supeviseRequireModal',

        //deviceAgent
        //'xmlRPC': 'libs/modules/services/cabin-deviceAgent/libs/vcXMLRPC',
        //'xmlRPC' : 'libs/components/mimic',
        //'xmlRPC': 'libs/components/mimic',
        'xmlRPC': 'libs/components/jquery-xmlrpc/jquery.xmlrpc',
        //'deviceAgent' : 'libs/modules/services/cabin-deviceAgent/libs/deviceagent',
        'cbDeviceAgent': 'libs/modules/services/cabin-deviceAgent/cabin-deviceAgent',





        //for poc
        'iBranchServ': 'scripts/services/iBranchServ',
        'userServ': 'scripts/services/userServ',





        'cbTest': 'libs/modules/directives/cabin-test/cabin-test'




    },
    'shim': {
        'cbBehavior': ['libs', 'cabin'],
        'cbSplitter': ['libs', 'cabin'],
        'cbNotify': ['libs', 'cabin'],
        'cbModule': ['libs', 'cabin'],
        'cbTopMenuBar': ['libs', 'cabin'],
        'cbPageViewer': ['libs', 'cabin'],
        'cbSideBar': ['libs', 'cabin'],
        //service
        'cbTxnRouterLoaderServ': ['libs', 'cabin'],
        'cbLazyRegisterServ': ['libs', 'cabin'],
        //modal
        'cbSupeviseModal': ['libs', 'cabin'],
        'cbSupeviseRequireModal': ['libs', 'cabin'],
        //deviceAgent
        'deviceAgent': ['xmlRPC'],
        'cbDeviceAgent': ['libs', 'cabin', 'xmlRPC', /*'deviceAgent'*/ ],
        'iBranchServ': ['libs', 'cabin'],
        'userServ': ['libs', 'cabin', 'iBranchServ']
    }
});

define('cabin-libs', ['libs', 'cabin', 'cbLazyRegisterServ', 'cbModule'].concat(properties.useCabinLibs), function(libs, cabin) {
    for (var index = 2; index < arguments.length; index++) {
        var modules = arguments[index];
        if (modules[0].constructor === String) {
            modules = [modules];
        }
        angular.forEach(modules, function(value, key) {
            cabin[value[0]].call(cabin, value[1], value[2]);
        });

    }
    console.log('cabin-libs Initialized');
});
