'use strict';
define('app', ['cabin', 'appCtrl'], function(cabin, appCtrl) {
    return cabin.run(['$rootScope', '$window', '$location', '$http', 'properties',
        function($rootScope, $window, $location, $http, properties) {
            $rootScope.$on('broadcast', function(ev, args) {
                $rootScope.$broadcast(args.event, args);
            });
            $rootScope.baseUrl = ('http://' + $window.location.host + properties.contentRoot).replace(/\/$/, '') + "/";

            $rootScope.routeTo = function(url) {
                $location.path(url);
            }

            $rootScope.pages = [];
            $http.get('basehandler/queryMenu').success(function(data) {
                $rootScope.pages = data.menu;
            });


        }
    ]).config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'cbLazyRegisterProvider', 'cbTxnRouterLoaderServiceProvider',
        function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

            $urlRouterProvider.otherwise('/index');
            $stateProvider
                .state('index', {
                    url: '/index'
                })
                .state('group', {
                    url: '/:group'
                })
                .state('group.Page', {
                    url: '/:page',
                    templateUrl: function(stateParams) {
                        console.log(stateParams);
                    },
                    controller: function() {

                    }
                });

        }
    ]).controller('appCtrl', appCtrl);
});
