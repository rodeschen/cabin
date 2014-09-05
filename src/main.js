'use strict';
var properties = {
    testMode: true,
    contentRoot: '/',
    //testMode: false,
    //contentRoot: '/cap-web',
    // useCabinLibs: [
    //     'cbBehavior',
    //     'cbUtils',
    //     'cbComboBox',
    //     'cbSplitter',
    //     'cbMaskNumber',
    //     'cbTxnRouterLoaderServ',
    //     'cbComboBoxServ',
    //     'cbWebSocketIoServ',
    //     'cbPageViewer',
    //     //for poc
    //     'cbDeviceAgent',
    //     'iBranchServ',
    //     'userServ',
    //     //modal 
    //     'cbSupeviseModal',
    //     'cbSupeviseRequireModal'
    // ],
    cabinModulePath: 'libs/modules/',
    //txnViewRootPath: 'views/',
    txnViewRootPath: 'scripts/page/',
    txnScriptRootPath: 'scripts/page/',
    comboBoxCache: false,
    defWebSocketURI: 'http://' + window.location.hostname + ':9092',
    //deviceAgentHost: '10.204.1.67:9980'
    //deviceAgentHost: '127.0.0.1:9980'
    deviceAgentHost: '10.204.1.63:9980'
};

require.config({
    urlArgs: 'cache=' + parseInt(Math.random() * 1000, 10),
    baseUrl: './',
    paths: {
        'libs': 'libs/libs',
        'cabin': 'libs/cabin',
        'cabin-core': 'libs/modules/core/cabin-core',
        'cabin-directives': 'libs/modules/directives/cabin-directives',
        'cabin-modals': 'libs/modules/modals/cabin-modals',
        'cabin-services': 'libs/modules/services/cabin-services',
        'cabin-validations': 'libs/modules/validations/cabin-validations',
        'cabin-cust': 'scripts/customize-libs',
        'app': 'scripts/app',
        'http-mock': '../_httpMock/define',
        //customize
        'appCtrl': 'scripts/ctrl/appCtrl'
    },
    shim: {
        'cabin-core': ['libs'],
        'cabin-services': ['cabin-core'],
        'cabin-modals': ['cabin-services'],
        'cabin-validations': ['cabin-modals'],
        'cabin-cust': ['cabin-validations'],
        'cabin': ['cabin-cust'],
        'app': ['cabin', 'appCtrl'],
        //'txn-validations': ['libs', 'cabin', 'cabin-libs', 'app'],
        'http-mock': ['app']
    }
});

require(['libs', 'cabin-core', 'cabin-services', 'cabin-directives', 'cabin-validations', 'cabin-cust', 'cabin', 'app', /*'txn-validations',*/ 'http-mock'], function() {
    var cabin = arguments[arguments.length - 1];
    angular.bootstrap(window.document, ['cabin']);
    console.log('app Initialized');

});


if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(fun /*, initial*/ ) {
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();

        // no value to return if no initial value and an empty array
        if (len == 0 && arguments.length == 1)
            throw new TypeError();

        var i = 0;
        if (arguments.length >= 2) {
            var rv = arguments[1];
        } else {
            do {
                if (i in this) {
                    rv = this[i++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++i >= len)
                    throw new TypeError();
            }
            while (true);
        }

        for (; i < len; i++) {
            if (i in this)
                rv = fun.call(null, rv, this[i], i, this);
        }

        return rv;
    };
}

if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

if (!window.console) {
    window.console = {
        log: function() {},
        error: function() {}
    }
}
