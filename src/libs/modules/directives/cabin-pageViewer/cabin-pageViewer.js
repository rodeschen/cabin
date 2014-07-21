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
                    scope.isLock = false;

                    angular.extend(scope, {
                        includeUrl: '',
                        isLock: false,
                        lock: function() {
                            if (scope.isLock) return;
                            iElement.find("input,textarea").each(function(i, e) {
                                var el = $(e);
                                //el.data('preadonly', el.prop('readonly') || false).prop('readonly', true).prop('tabindex', -1);
                                el.data('preadonly', el.prop('disabled') || false).prop('disabled', true).prop('tabindex', -1);
                            });
                            scope.isLock = true;
                        },
                        unlock: function() {
                            if (!scope.isLock) return;
                            iElement.find("input,textarea").each(function(i, e) {
                                var el = $(e);
                                el.prop('disabled', el.data('preadonly') || false).removeData('preadonly');
                                if (el.prop('disabled')) {
                                    el.prop('tabindex', -1);
                                } else {
                                    el.removeProp('tabindex');
                                }
                            });
                            scope.isLock = false;
                        }
                    })
                    scope.data = {
                        "txnId": undefined
                    }
                    if (scope.receiveEvent !== false) {
                        var receiveEvent = scope.receiveEvent || 'pageViewer';

                        scope.$on(receiveEvent, function(event, data) {
                            scope.includeUrl = "";
                            if (data && data.page && data.page.url) {
                                scope.isLock = false;
                                openPage(data.page.url);
                            }
                        });
                        scope.$on(receiveEvent + '-lock', scope.lock);
                        scope.$on(receiveEvent + '-unlock', scope.unlock);
                    }

                    scope.data = {};

                    if (scope.initData) {
                        scope.data = scope.initData;
                        //angular.extend(scope.data, scope.initData);
                    }

                    scope.$watch('initPath', function(v) {
                        v && openPage(v);
                    });

                    //for poc
                    var txnId;
                    scope.submitForm = function(dataForm) {
                        if (dataForm.$valid) {
                            scope.data = scope.data || {};
                            scope.data.hiddenData = "hiddenData";
                            iBranchServ.send(txnId, scope.data);
                        } else {
                            console.log(dataForm)
                            iBranchServ.sendMessage('error', "煩請確認資料是否正確!");
                        }
                    }

                    scope.$on('putValue', function(event, data) {
                        scope.data = scope.data || {};
                        for (var key in data) {
                            scope.data[key] = data[key];
                        }
                    })

                    function openPage(pageUrl) {
                        if (pageUrl.match(/txn[0-9]+/)) {
                            txnId = pageUrl.replace('txn', '');
                        } else {
                            txnId = '';
                        }
                        if (pageUrl) {
                            var url = pageUrl.replace(/(^\/|\/$)/, '');
                            var pageName = url.split('/');
                            pageName = pageName[pageName.length - 1];
                            //iElement.children().attr("ng-controller", pageName + "Ctrl");
                            require(["scripts/page/" + url.replace(/^\//, '') + "/" + pageName], function(settings) {
                                //init data
                                var s = angular.extend({}, {
                                    controller: true,
                                    templateUrl: true,
                                    service: []
                                }, settings || {});
                                var promises = [];
                                if (s.controller) {
                                    //iElement.children().attr('ng-controller', pageName + 'Ctrl');
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
                                scope.autoSend = s.autoSend === false ? false : true;
                                $q.all(promises).then(function() {
                                    $timeout(function() {
                                        if (s.templateUrl === true) {
                                            scope.$on('$includeContentLoaded', function() {

                                                if (scope.readOnly == true) {
                                                    $timeout(function() {
                                                        scope.lock();
                                                        //iElement.find("input").prop('readonly', true);
                                                    }, 500);
                                                }
                                                // $timeout(function() {
                                                //     iElement.find("input[readonly],textarea[readonly]").prop('tabindex', -1);
                                                // }, 600);
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
