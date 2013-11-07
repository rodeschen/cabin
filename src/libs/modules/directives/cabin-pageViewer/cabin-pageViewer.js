'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbPageViewer', ['$rootScope', '$compile', '$timeout', '$q', 'properties', 'cbLazyRegisterServ', 'cabinModulePath',
        function($rootScope, $compile, $timeout, $q, properties, cbLazyRegister, cabinModulePath) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-pageViewer/templates/pageViewer.html',
                restrict: 'AEC',
                scope: {
                    'cbPageView': '@',
                    'receiveEvent': '@'
                },
                link: function(scope, iElement) {
                    scope.includeUrl = "";
                    scope.$on(scope.receiveEvent || 'pageViewer', function(event, data) {
                        scope.includeUrl = "";
                        if (data && data.page && data.page.url) {
                            var url = data.page.url.replace(/(^\/|\/$)/, '');
                            var pageName = url.split('/');
                            pageName = pageName[pageName.length - 1];


                            iElement.children().attr("ng-controller", pageName + "Ctrl")//.find("#includePage").attr("ng-include", "includeUrl");

                            require(["scripts/page/" + url.replace(/^\//, '') + "/" + pageName], function(settings) {
                                //init data
                                var s = angular.extend({}, {
                                    controller: true,
                                    templateUrl: true,
                                    service: []
                                }, settings || {});
                                console.log(s);
                                var promises = [];
                                if (s.controller) {
                                    iElement.children().attr('ng-controller', pageName + 'Ctrl');
                                    var ctrl_deferred = $q.defer();
                                    var path = s.controller === true ? (properties.txnScriptRootPath + url + '/' + pageName + 'Ctrl') : s.controller;
                                    require([path], function() {
                                        cbLazyRegister.register.apply(cbLazyRegister, arguments[0]);
                                        ctrl_deferred.resolve();
                                    });
                                    promises.push(ctrl_deferred.promise);
                                }

                                if (s.service) {
                                    var services;
                                    if (s.service.constructor == String || s.service.constructor === Boolean) {
                                        services = [s.service];
                                    } else if (s.service.constructor == Array) {
                                        services = s.service;
                                    }
                                    if (services) {
                                        var srv_deferred = $q.defer();
                                        var srv_loader = [];
                                        angular.forEach(services, function(value, key) {
                                            var path = "";
                                            if (/@modules$/.test(value)) {
                                                path = value.replace(/@modules$/, '');
                                            } else if (/@page$/.test(value)) {
                                                path = value.replace(/@page$/, '') + 'Serv';
                                            } else if (value === true) {
                                                path = properties.txnScriptRootPath + url + '/' + pageName + 'Serv';
                                            } else {
                                                path = properties.txnScriptRootPath + url + '/' + value;
                                            }
                                            srv_loader.push(path);
                                        });
                                        require(srv_loader, function() {
                                            angular.forEach(arguments, function(value, key) {
                                                cbLazyRegister.register.apply(cbLazyRegister, value);
                                            });
                                            srv_deferred.resolve();
                                        });
                                        promises.push(srv_deferred.promise);
                                    }
                                }

                                $q.all(promises).then(function() {
                                    $timeout(function() {
                                        // if(scope.$$$viewScope){
                                        //     debugger;
                                        //     scope.$$$viewScope.$destroy();
                                        //     debugger;
                                        // }
                                        console.log("ADFAS")
                                        //scope.$$$viewScope = scope.$new();
                                        //$compile(iElement.children())(scope);
                                        if (s.templateUrl === true) {
                                            scope.includeUrl = properties.txnViewRootPath + url + '/' + pageName + ".html"
                                            //scope.$apply();
                                        }
                                    }, 100)
                                });
                            }, function(error) {
                                console.log("load error")
                            });
                        }
                    });
                }
            };
        }
    ]];
});