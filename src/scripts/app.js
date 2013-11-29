'use strict';
define('app', ['cabin', 'appCtrl'], function(cabin, appCtrl) {
    return cabin.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'cbLazyRegisterServProvider', 'cbTxnRouterLoaderServProvider',
        function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, lazyRegisterProvider, txnRouterLoaderSrv) {
            lazyRegisterProvider.setRegisters({
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
                provider: $provide.provider
            });

            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index', {
                    url: '/index'
                }).
            state('group', {
                url: '/{:group}aa',
                templateUrl: 'scripts/page/William/page1.html',
                controller:function(){console.log("ffff")}
            }).state('group.page', {
                url: '/:page'
            }).state('william', {
                url: '/william',
                controller:function(){console.log("SSS")},
                templateUrl: 'scripts/page/William/page1.html'
            }).state('william2', {
                url: '/william2',
                templateUrl: 'scripts/page/William/page2.html'
            })
            // .state('group', txnRouterLoaderSrv.setRoute('/:group'))
            // .state('group.Page', txnRouterLoaderSrv.setRoute('^/:group/:page'));

        }
    ]).run(['$rootScope', '$window', '$http', 'properties',
        function($rootScope, $window, $http, properties) {
            $rootScope.$on('broadcast', function(ev, args) {
                //console.log('broadcast', args);
                $rootScope.$broadcast(args.event, args);
            });
            $rootScope.baseUrl = ('http://' + $window.location.host + properties.contentRoot).replace(/\/$/, '') + "/";
            properties.contentRoot = properties.contentRoot.replace(/\/$/, '') + "/";
        }
    ]).controller('appCtrl', appCtrl);
});
