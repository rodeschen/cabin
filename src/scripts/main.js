'use strict';
var properties = {
    testMode: true,
    contentRoot: '/',
    useCabinLibs: [
        'cabin-txnRouterLoaderService'
    ],
    cabinModuleTemplatePath: 'libs/modules/templates/',
    viewsTemplatePath: '/views/'
};

require.config({
    urlArgs: 'cache=' + parseInt(Math.random() * 1000, 10),
    baseUrl: '../',
    paths: {
        'libs': 'libs/libs',
        'cabin': 'libs/cabin',
        'cabin-libs': 'libs/cabin-libs',
        'app': 'scripts/app',
        '_http-test': '../_httpTest/define'
    },
    shim: {
        'cabin-libs': ['libs'],
        'app': ['libs', 'cabin', 'cabin-libs'],
        '_http-test': ['libs', 'cabin', 'cabin-libs', 'app']
    }
});

require(['libs', 'cabin', 'cabin-libs', 'app'].concat(properties.testMode ? ['_http-test'] : []), function() {
    var cabin = arguments[arguments.length - 1];
    angular.bootstrap(window.document, ['cabin']);
    console.log('app Initialized');
});
