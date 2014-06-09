'use strict';
define('app', ['cabin', 'appCtrl'], function(cabin, appCtrl) {
    return cabin.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'cbLazyRegisterServProvider', 'cbTxnRouterLoaderServProvider','$locationProvider',
        function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, lazyRegisterProvider, txnRouterLoaderSrv,$locationProvider) {
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
                url: '/:group'
            }).state('group.page', {
                url: '/:page'
            });
            // .state('group', txnRouterLoaderSrv.setRoute('/:group'))
            // .state('group.Page', txnRouterLoaderSrv.setRoute('^/:group/:page'));
            $locationProvider.html5Mode(false);

        }
    ]).run(['$rootScope', '$window', '$http', 'properties', 'cbWebSocketIoServ','cbDeviceAgentSrv',
        function($rootScope, $window, $http, properties, cbWebSocketIoServ,cbDeviceAgentSrv) {
            $rootScope.$on('broadcast', function(ev, args) {
                //console.log('broadcast', args);
                $rootScope.$broadcast(args.event, args);
            });
            $rootScope.baseUrl = ('http://' + $window.location.host + properties.contentRoot).replace(/\/$/, '') + "/";
            //$rootScope.baseUrl 
            properties.contentRoot = properties.contentRoot.replace(/\/$/, '') + "/";

            // var gSocket = cbWebSocketIoServ.getConnect(properties.defWebSocketURI, "gSocket");
            // gSocket.on("chatevent", function(data) {
            //     $rootScope.$broadcast("notify",{
            //         message : data.userName + " : " + data.message
            //     })
            // });
        }
    ]).controller('appCtrl', appCtrl);
});
