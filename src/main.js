'use strict';
var properties = {
    testMode: true,
    contentRoot: '/',
    //testMode: false,
    //contentRoot: '/cap-web',
    useCabinLibs: [
        'cbBehavior',
        'cbUtils',
        'cbComboBox',
        'cbSplitter',
        'cbMaskNumber',
        'cbTxnRouterLoaderServ',
        'cbComboBoxServ',
        'cbWebSocketIoServ',
        //for poc
        'cbDeviceAgent',
        'iBranchServ',
        'userServ',
        //modal 
        'cbSupeviseModal',
        'cbSupeviseRequireModal'


    ],
    cabinModulePath: 'libs/modules/',
    //txnViewRootPath: 'views/',
    txnViewRootPath: 'scripts/page/',
    txnScriptRootPath: 'scripts/page/',
    comboBoxCache: false,
    defWebSocketURI: 'http://' + window.location.hostname + ':9092'
};

require.config({
    urlArgs: 'cache=' + parseInt(Math.random() * 1000, 10),
    baseUrl: './',
    paths: {
        'libs': 'libs/libs',
        'cabin': 'libs/cabin',
        'cabin-libs': 'libs/cabin-libs',
        'txn-validations': 'scripts/validations',
        'app': 'scripts/app',
        'http-mock': '../_httpMock/define',
        //customize
        'appCtrl': 'scripts/ctrl/appCtrl'
    },
    shim: {
        'cabin-libs': ['libs'],
        'app': ['libs', 'cabin', 'cabin-libs'],
        'txn-validations': ['libs', 'cabin', 'cabin-libs', 'app'],
        'http-mock': ['libs', 'cabin', 'cabin-libs', 'app']
    }
});

require(['libs', 'cabin', 'cabin-libs', 'app', 'txn-validations', 'http-mock'], function() {
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

if (!window.console) {
    window.console = {
        log: function() {},
        error: function() {}
    }
}
