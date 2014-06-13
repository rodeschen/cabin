'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbPageViewer', ['$rootScope', '$compile', '$timeout', '$q', 'properties', 'cbLazyRegisterServ', 'cabinModulePath', 'iBranchServ',
        function($rootScope, $compile, $timeout, $q, properties, cbLazyRegister, cabinModulePath, iBranchServ) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-pageViewer/templates/pageViewer.html',
                restrict: 'AEC',
                scope: {
                    'cbPageView': '@',
                    'receiveEvent': '@',
                    'initPath': '@',
                    'initData': '=',
                    'readOnly': '='
                },
                link: function(scope, iElement) {
                    scope.includeUrl = "";
                    if (scope.receiveEvent !== undefined) {
                        scope.$on(scope.receiveEvent || 'pageViewer', function(event, data) {
                            scope.includeUrl = "";
                            if (data && data.page && data.page.url) {
                                openPage(data.page.url);
                            }
                        });
                    }
                    // if (scope.initPath) {
                    //     openPage(scope.initPath); 
                    // }

                    if (scope.initData) {
                        angular.extend(scope, scope.initData);
                    }

                    scope.$watch('initPath', function(v) {
                        v && openPage(v);
                    });

                    //for poc
                    var txnId;
                    scope.submitForm = function(dataForm) {
                        console.log(dataForm);
                        if (dataForm.$valid) {
                            iBranchServ.send(txnId, dataForm);
                        } else {
                            iBranchServ.sendMessage('error', "煩請確認資料是否正確!");
                        }
                    }

                    function openPage(pageUrl) {
                        if (pageUrl.match(/txn[1-9]+/)) {
                            txnId = pageUrl.replace('txn', '');
                        } else {
                            txnId = '';
                        }
                        if (pageUrl) {
                            var url = pageUrl.replace(/(^\/|\/$)/, '');
                            var pageName = url.split('/');
                            pageName = pageName[pageName.length - 1];
                            iElement.children().attr("ng-controller", pageName + "Ctrl");
                            require(["scripts/page/" + url.replace(/^\//, '') + "/" + pageName], function(settings) {
                                //init data
                                var s = angular.extend({}, {
                                    controller: true,
                                    templateUrl: true,
                                    service: []
                                }, settings || {});
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
                                        if (s.templateUrl === true) {
                                            scope.$on('$includeContentLoaded', function() {

                                                if (scope.readOnly == true) {
                                                    $timeout(function() {
                                                        iElement.find("input").prop('readonly', true);
                                                    }, 500);
                                                }
                                                $timeout(function() {
                                                    iElement.find("input[readonly],textarea[readonly]").attr('tabindex', -1);
                                                }, 600);
                                            });
                                            scope.includeUrl = properties.txnViewRootPath + url + '/' + pageName + ".html"

                                        }
                                    }, 100)
                                });
                            }, function(error) {
                                console.log('load ' + pageUrl + ' issue!!');
                                console.log(error);
                            });
                        }
                    }
                }
            };
        }
    ]];
});
