'use strict';

var properties = {
    testMode: true,
    contentRoot: '/',
    //testMode: false,
    //contentRoot: '/cap-web',
    useCabinLibs: [
        'cbComboBox',
        'cbSplitter',
        'cbTxnRouterLoaderServ',
        'cbComboBoxServ' //, //,
        // 'cbWiTable'
    ],
    cabinModulePath: 'libs/modules/',
    //txnViewRootPath: 'views/',
    txnViewRootPath: 'scripts/page/',
    txnScriptRootPath: 'scripts/page/',
    comboBoxCache: false
};

require.config({
    urlArgs: 'cache=' + parseInt(Math.random() * 1000, 10),
    baseUrl: './',
    paths: {
        'libs': 'libs/libs',
        'cabin': 'libs/cabin',
        'cabin-libs': 'libs/cabin-libs',
        'app': 'scripts/app',
        'http-mock': '../_httpMock/define',
        //customize
        'appCtrl': 'scripts/ctrl/appCtrl'
    },
    shim: {
        'cabin-libs': ['libs'],
        'app': ['libs', 'cabin', 'cabin-libs'],
        'http-mock': ['libs', 'cabin', 'cabin-libs', 'app']
    }
});

require(['libs', 'cabin', 'cabin-libs', 'app'].concat(properties.testMode ? ['http-mock'] : []), function() {
    var cabin = arguments[arguments.length - 1];
    angular.bootstrap(window.document, ['cabin']);
    console.log('app Initialized');
});
