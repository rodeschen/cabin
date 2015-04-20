'use strict';
define('app', ['cabin'], function(cabin) {
    return cabin.config(['$ocLazyLoadProvider',
        function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                loadedModules: ['cabin'],
                jsLoader: requirejs,
                events: true,
                debug: true,
                cache: true
            });
        }
    ]).run(['$ocLazyLoad', 'cbLazyInitialServ',
        function($ocLazyLoad, cbLazyInitialServ) {

            $ocLazyLoad.load([{
                name: 'cabin-modals',
                files: ['cabin-modals']
            }]).then(function() {}, function() {});

            var serviceDefer = cbLazyInitialServ.add("loadServices");
            $ocLazyLoad.load([{
                name: 'cabin-services',
                files: ['cabin-services']
            }]).then(function() {
                serviceDefer.resolve();
            }, function() {});
            var defer = cbLazyInitialServ.add("loadDirectives");
            $ocLazyLoad.load([{
                name: 'cabin-directives',
                files: ['cabin-directives']
            }]).then(function() {
                defer.resolve();
            }, function() {});
        }
    ]).config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'cbLazyRegisterServProvider', 'cbTxnRouterLoaderServProvider', '$locationProvider',
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
                    // resolve: {
                    //     userServ: ['userServ',
                    //         function(user) {}
                    //     ]
                    // },
                    controller: ['$scope', '$timeout', 'cbDeviceAgentSrv',
                        function($scope, $timeout, cbDeviceAgentSrv) {
                            // cbDeviceAgentSrv.eject();
                        }
                    ]
                }).state('txn', {
                    url: '/txn/{id:[^/]+}',
                    // resolve: {
                    //     userServ: ['userServ',
                    //         function(user) {}
                    //     ]
                    // },
                    controller: ['$stateParams', '$scope', /*'cbDeviceAgentSrv',*/
                        function($stateParams, $scope, cbDeviceAgentSrv) {
                            // cbDeviceAgentSrv.eject();
                            $scope.$emit('broadcast', {
                                event: 'pageViewer',
                                page: {
                                    url: 'txn' + $stateParams.id
                                }
                            });
                        }
                    ]
                }).state('txnInit', {
                    url: '^/txn/{id:[^/]+}/{data:[^/]+}',
                    // resolve: {
                    //     userServ: ['userServ',
                    //         function(user) {}
                    //     ]
                    // },
                    controller: ['$stateParams', '$scope',
                        function($stateParams, $scope) {
                            var decode = atob($stateParams.data);
                            $scope.$emit('broadcast', {
                                event: 'pageViewer',
                                page: {
                                    url: 'txn' + $stateParams.id,
                                    data: decode
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
            $locationProvider.html5Mode(true);
        }

    ]).config(['$httpProvider',
        //txn precheck
        function($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$rootScope',
                function($q, $rootScope) {
                    return {
                        // optional method
                        'request': function(config) {
                            return config;
                        },

                        // optional method
                        'requestError': function(rejection) {
                            console.log('requestError', rejection);
                            return $q.reject(rejection);
                        },



                        // optional method
                        'response': function(response) {
                            var url = response.config.url;
                            if (url == '/iBranchApp/json') {
                                if (response.config.data.indexOf("OVQUERY") == -1) {
                                    console.log('response', response);
                                }
                                if (angular.isArray(response.data)) {
                                    response.data = response.data[0].poc;
                                    //如果交易狀態為2及 reject 交易
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
                            return $q.reject(rejection);
                        }
                    };
                }
            ]);
        }
    ]).run(['$rootScope', '$window', '$http', 'properties', '$document', '$state',
        function($rootScope, $window, $http, properties, $document, $state /*, cbOpenTxnModal,cbWebSocketIoServ, cbDeviceAgentSrv,*/ ) {
            $rootScope.$on('broadcast', function(ev, args) {
                //console.log('broadcast', args);
                $rootScope.$broadcast(args.event, args);
            });
            $rootScope.baseUrl = ('http://' + $window.location.host + properties.contentRoot).replace(/\/$/, '') + "/";
            //$rootScope.baseUrl 
            properties.contentRoot = properties.contentRoot.replace(/\/$/, '') + "/";
            angular.element($document).on('keydown', function(e) {

                $rootScope.$apply(function() {
                    switch (e.which) {
                        case 27:
                            $rootScope.$broadcast("keydown.esc");
                            break;
                        case 13:
                            $rootScope.$broadcast("keydown.enter");
                            break;
                            // case 84:
                            //     if (e.ctrlKey && e.altKey) {
                            //         cbOpenTxnModal.open();
                            //     }
                            //     break;
                        case 81:
                            if (e.ctrlKey && e.altKey) {
                                $state.go('index');
                            }

                    }
                });
            });
            // var gSocket = cbWebSocketIoServ.getConnect(properties.defWebSocketURI, "gSocket");
            // gSocket.on("chatevent", function(data) {
            //     $rootScope.$broadcast("notify",{
            //         message : data.userName + " : " + data.message
            //     })
            // });
        }
    ]).run(['$rootScope', '$window', '$state', '$stateParams', '$timeout', 'userServ',
        function($rootScope, $window, $state, $stateParams, $timeout, userServ) {
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
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            // catch all keydown

            var allowKeys = [
                '9' // tab
            ];
            angular.element($window).on("keydown", function(event) {
                var keyCode = event.which;
                
                if(keyCode == 115){
                    var controller = angular.element(event.target).controller('ngModel');
                    controller.$setViewValue("SS", event);
                    controller.$render()


                    console.log(controller.$name)
                }
                
                if (allowKeys.indexOf(event.which) != -1) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            });
        }
    ]);
});
