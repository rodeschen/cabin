'use strict';
define('app', ['cabin'], function(cabin) {
    return cabin.run(['$rootScope', '$window', 'properties',
        function($rootScope, $window, properties) {
            $rootScope.$on('broadcast', function(ev, args) {
                $rootScope.$broadcast(args.event, args);
            });
            $rootScope.baseUrl = ('http://' + $window.location.host + properties.contentRoot).replace(/\/$/, '');
        }
    ]).config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', 'cbTxnRouterLoaderServiceProvider',
        function($stateProvider, $urlRouterProvider, $controllerProvider, txnRouterLoaderSrv) {
            txnRouterLoaderSrv.setControllerProvider($controllerProvider);
            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index', {
                    url: '/index',
                    template: 'index index'
                })
                .state('txn', txnRouterLoaderSrv.setRoute('/txn', {
                    'default': 'index'
                }))
                .state('txn.group', txnRouterLoaderSrv.setRoute('/:group', {
                    'base': '/txn'
                }))
                .state('txn.groupAndPage', txnRouterLoaderSrv.setRoute('/:group/:page', {
                    'base': '/txn'
                }));

        }
    ]);
});
