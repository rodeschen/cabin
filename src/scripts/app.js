'use strict';
define('app', ['cabin', 'appCtrl'], function(cabin, appCtrl) {
    return cabin.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'cbLazyRegisterServProvider', 'cbTxnRouterLoaderServProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, lazyRegisterProvider, txnRouterLoaderSrv, $locationProvider) {
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
                    url: '/index',
                    resolve: {
                        userServ: ['userServ',
                            function(user) {}
                        ]
                    },
                    controller: ['$scope', '$timeout',
                        function($scope, $timeout) {
                            $timeout(function() {
                                $scope.$emit('broadcast', {
                                    event: 'pageViewer',
                                    page: {
                                        url: 'favorite'
                                    }
                                });
                            }, 0);
                        }
                    ]
                }).state('txn', {
                    url: '/txn/{id:[^/]+}',
                    resolve: {
                        userServ: ['userServ',
                            function(user) {}
                        ]
                    },
                    controller: ['$stateParams', '$scope',
                        function($stateParams, $scope) {
                            $scope.$emit('broadcast', {
                                event: 'pageViewer',
                                page: {
                                    url: 'txn' + $stateParams.id
                                }
                            });
                        }
                    ]
                }).state('login', {
                    url: '/login',
                    resolve: {
                        userServ: ['userServ',
                            function(user) {}
                        ]
                    },
                    controller: ['$stateParams', '$scope',
                        function($stateParams, $scope) {
                            console.log('txn' + $stateParams.id)
                            $scope.$emit('broadcast', {
                                event: 'pageViewer',
                                page: {
                                    url: 'txn' + $stateParams.id
                                }
                            });
                        }
                    ]
                });

            // state('group', {
            //     url: '/:group'
            // }).state('group.page', {
            //     url: '/:page'
            // });
            // .state('group', txnRouterLoaderSrv.setRoute('/:group'))
            // .state('group.Page', txnRouterLoaderSrv.setRoute('^/:group/:page'));
            $locationProvider.html5Mode(false);

        }
    ]).config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$rootScope',
                function($q, $rootScope) {
                    return {
                        // optional method
                        'request': function(config) {
                            //console.log('httpConfig', config);
                            // do something on success
                            return config;
                        },

                        // optional method
                        'requestError': function(rejection) {
                            console.log('requestError', rejection);
                            // do something on error
                            // if (canRecover(rejection)) {
                            //     return responseOrNewPromise
                            // }
                            return $q.reject(rejection);
                        },



                        // optional method
                        'response': function(response) {
                            var url = response.config.url;
                            if (url == '/iBranchApp/json') {
                                console.log('response', response);
                                if (angular.isArray(response.data)) {
                                    response.data = response.data[0].poc;
                                    if (response.data.txnStatus == '2') {
                                        return $q.reject(response);
                                    }
                                }
                                // do something on success
                            }
                            return response;
                        },

                        // optional method
                        'responseError': function(rejection) {
                            console.log('responseError', rejection);
                            // do something on error
                            // if (canRecover(rejection)) {
                            //     return responseOrNewPromise
                            // }
                            return $q.reject(rejection);
                        }
                    };
                }
            ]);
        }
    ]).run(['$rootScope', '$window', '$http', 'properties', 'cbWebSocketIoServ', 'cbDeviceAgentSrv',
        function($rootScope, $window, $http, properties, cbWebSocketIoServ, cbDeviceAgentSrv) {
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
    ]).controller('appCtrl', appCtrl).run(['$rootScope', '$window', 'userServ', '$state', 'cbDeviceAgentSrv',
        function($rootScope, $window, userServ, $state, cbDeviceAgentSrv) {
            //  cbDeviceAgentSrv.print("adfafadsf<ff>")
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {});
            userServ.then(function(data) {
                $rootScope.isLogin = true;
                $state.go('index');
            }, function(data) {
                $state.go('index');
                $rootScope.isLogin = false;
            });

            $rootScope.user = userServ.getUser();
            console.log($rootScope.user, 'user');

        }
    ]);
});
