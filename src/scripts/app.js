'use strict';
define('app', ['cabin'], function(cabin) {
    return cabin.run(['$rootScope', '$window', 'properties',
        function($rootScope, $window, properties) {
            $rootScope.$on('broadcast', function(ev, args) {
                $rootScope.$broadcast(args.event, args);
            });
            $rootScope.baseUrl = ('http://' + $window.location.host + properties.contentRoot).replace(/\/$/, '');
        }
    ]).config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'cbLazyRegisterProvider', 'cbTxnRouterLoaderServiceProvider',
        function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, lazyRegisterProvider, txnRouterLoaderSrv) {
            lazyRegisterProvider.setRegisters({
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            });

            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index', {
                    url: '/index',
                    template: 'index index'
                })
                .state('group', txnRouterLoaderSrv.setRoute('/:group', {
                    abstract: true
                }))
                .state('groupAndPage', txnRouterLoaderSrv.setRoute('/:group/:page'));

        }
    ]);
});
