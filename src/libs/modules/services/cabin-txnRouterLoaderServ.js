'use strict';
define(['cabin'], function(cabin) {
    return ['provider', 'cbTxnRouterLoaderServ', [
        function() {
            var lazyRegisterProvider;
            this.$get = function() {
                return this;
            };
            var defaultSettings = {
                viewPath: 'views',
                ctrlPath: 'scripts/ctrl'
            }
            this.setLazyRegisterProvider = function(provider) {
                lazyRegisterProvider = provider;
            }
            this.setup = function(settings) {
                settings = angular.extend(settings, settings || {});
            }

            this.setRoute = function(url, extAttr) {
                var settings = angular.extend({}, defaultSettings, extAttr);
                var _tPath = url.replace(/^\^?\//, '').split("/");
                var path = [];
                var result = {
                    url: url
                };
                // if (settings['default']) {

                //     angular.forEach(_tPath, function(value, key) {
                //         if (!/^:/.test(value) && !path.length) {
                //             path.push(value);
                //         }
                //     });
                //     path.push(settings['default']);
                //     //set html
                //     result.templateUrl = [defaultSettings.viewPath].concat(path).join("/") + ".html";
                //     result.resolve = {
                //         loadCtrl: ['$q', '$stateParams',
                //             function($q, stateParams) {
                //                 var defer = $q.defer();
                //                 require([
                //                     [defaultSettings.ctrlPath].concat(path).join("/") + 'Ctrl'
                //                 ], function(ctrl) {
                //                     var ctrlName = path[path.length - 1];
                //                     lazyRegisterProvider.controller(ctrlName + 'Ctrl', ctrl)
                //                     defer.resolve();
                //                 });

                //                 return defer.promise;
                //             }
                //         ]
                //     };

                // } else {
                // result.templateUrl = function(stateParams) {
                //     return [defaultSettings.viewPath].concat(getPath(stateParams)).join("/") + '.html';
                // };
                // result.resolve = {
                //     loadCtrl: ['$q', '$stateParams',
                //         function($q, stateParams) {
                //             var defer = $q.defer();
                //             var path = getPath(stateParams);
                //             require([
                //                 [defaultSettings.ctrlPath].concat(path).join("/") + 'Ctrl'
                //             ], function(ctrl) {
                //                 var ctrlName = path[path.length - 1];
                //                 lazyRegisterProvider.controller(ctrlName + 'Ctrl', ctrl)
                //                 defer.resolve();
                //             });

                //             return defer.promise;
                //         }
                //     ]
                // };
                // }
                if (settings.abstract) {
                    return result
                } else {
                    result.templateUrl = function(stateParams) {
                        return [defaultSettings.viewPath].concat(getPath(stateParams)).join("/") + '.html';
                    };
                    result.resolve = {
                        loadCtrl: ['$q', '$stateParams',
                            function($q, stateParams) {
                                var defer = $q.defer();
                                var path = getPath(stateParams);
                                require([
                                    [defaultSettings.ctrlPath].concat(path).join("/") + 'Ctrl'
                                ], function(ctrl) {
                                    var ctrlName = path[path.length - 1];
                                    lazyRegisterProvider.controller(ctrlName + 'Ctrl', ctrl)
                                    defer.resolve();
                                });

                                return defer.promise;
                            }
                        ]
                    };
                }
                return result;

                function getPath(stateParams) {
                    
                    var path = [];
                    angular.forEach(_tPath, function(value, key) {
                        value = value.replace(/^\^/, '');
                        if (!/^:/.test(value)) {
                            path.push(value);
                        } else {
                            path.push(stateParams[value.replace(/^\:/, '')]);
                        }
                    });
                    return path;
                }

                return result;
            };
            return this;
        }
    ]];
});
