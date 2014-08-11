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
                    controller: ['$scope', '$timeout', 'cbDeviceAgentSrv',
                        function($scope, $timeout, cbDeviceAgentSrv) {
                            cbDeviceAgentSrv.eject();
                            // $timeout(function() {
                            //     $scope.$emit('broadcast', {
                            //         event: 'pageViewer',
                            //         page: {
                            //             url: 'favorite'
                            //         }
                            //     });
                            // }, 0);
                        }
                    ]
                }).state('txn', {
                    url: '/txn/{id:[^/]+}',
                    resolve: {
                        userServ: ['userServ',
                            function(user) {}
                        ]
                    },
                    controller: ['$stateParams', '$scope', 'cbDeviceAgentSrv',
                        function($stateParams, $scope, cbDeviceAgentSrv) {
                            cbDeviceAgentSrv.eject();
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
                    resolve: {
                        userServ: ['userServ',
                            function(user) {}
                        ]
                    },
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
        //txn precheck
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
    ]).run(['$rootScope', '$window', '$http', 'properties', 'cbWebSocketIoServ', 'cbDeviceAgentSrv', '$document', 'cbOpenTxnModal', '$state',
        function($rootScope, $window, $http, properties, cbWebSocketIoServ, cbDeviceAgentSrv, $document, cbOpenTxnModal, $state) {
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
                        case 84:
                            if (e.ctrlKey && e.altKey) {
                                cbOpenTxnModal.open();
                            }
                            break;
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
    ]).controller('appCtrl', appCtrl).run(['$rootScope', '$window', 'userServ', '$state', '$stateParams', '$timeout',
        function($rootScope, $window, userServ, $state, $stateParams, cbDeviceAgentSrv, $timeout) {

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {});
            userServ.then(function(data) {
                $rootScope.isLogin = true;
                $state.go('index');
            }, function(data) {
                $state.go('index');
                $rootScope.isLogin = false;
            });
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.user = userServ.getUser();
            console.log($rootScope.user, 'user');

        }
    ]).run(['$timeout', 'iBranchServ', 'cbDeviceAgentSrv', '$injector',
        function($timeout, iBranchServ, cbDeviceAgentSrv, $injector) {
            // cbDeviceAgentSrv.printWebPrinter("/iBranchApp/seal1.pdf", "xdfdfdfd...", "XXX");
            //test code
            //  cbDeviceAgentSrv.print("adfafadsf<ff>")
            //console.log("FFFFFFFFFFFFFFFFF",cbDeviceAgentSrv.decode(true))
            $timeout(function() {
                // cbDeviceAgentSrv.decode(true).then(function(data) {
                //     alert("success:" + data)
                // }, function(data) {
                //     alert("error" + data);
                // });
                // cbDeviceAgentSrv.encode(":20016801378622373500000054595000112340", true).then(function(data) {
                //     alert("success:" + data)
                // }, function(data) {
                //     alert("error" + data);
                // });
            }, 1000);

            // iBranchServ.queryEjContext(3);
            // var modal = $injector.get('cbCommonModal');
            // var job = {};
            // modal.activate({
            //     message: job.DATA || "SSSS",
            //     deferred: job.deferred,
            //     buttons: [{
            //         name: '列印',
            //         type: 'primary',
            //         action: function() {
            //             cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId).then(function() {
            //                 deferred.resolve();
            //             });
            //         }
            //     }, {
            //         name: '取消',
            //         type: 'danger',
            //         action: function() {
            //             cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId).then(function() {
            //                 deferred.reject();
            //             });
            //         }
            //     }]
            // });
        }
    ]);
});
