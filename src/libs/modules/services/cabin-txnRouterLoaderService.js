'use strict';
define(['cabin'], function(cabin) {
    return cabin.provider('cbTxnRouterLoaderService', function() {
        var $controllerProvider;
        this.setControllerProvider = function(ctrlProv) {
            $controllerProvider = ctrlProv;
        }

        this.$get = function() {
            return this;
        };
        var defaultSettings = {
            viewPath: 'views',
            ctrlPath: 'scripts/ctrl'
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
            if (settings['default']) {

                angular.forEach(_tPath, function(value, key) {
                    if (!/^:/.test(value) && !path.length) {
                        path.push(value);
                    }
                });
                path.push(settings['default']);
                //set html
                result.templateUrl = [defaultSettings.viewPath].concat(path).join("/") + ".html";
                result.resolve = {
                    loadCtrl: ['$q', '$stateParams',
                        function($q, stateParams) {
                            var defer = $q.defer();
                            require([
                                [defaultSettings.ctrlPath].concat(path).join("/") + 'Ctrl'
                            ], function(ctrl) {
                                var ctrlName = path[path.length - 1];
                                $controllerProvider.register(ctrlName + 'Ctrl', ctrl)
                                defer.resolve();
                            });

                            return defer.promise;
                        }
                    ]
                };

            } else {
                result.templateUrl = function(stateParams) {
                    return [defaultSettings.viewPath].concat(getPath(stateParams)).join("/") + '.html';
                };
                result.resolve = {
                    loadCtrl: ['$q', '$stateParams',
                        function($q, stateParams) {
                            var defer = $q.defer();
                            var path = getPath(stateParams);
                            require([[defaultSettings.ctrlPath].concat(path).join("/") + 'Ctrl'], function(ctrl) {
                                var ctrlName = path[path.length - 1];
                                $controllerProvider.register(ctrlName + 'Ctrl', ctrl)
                                defer.resolve();
                            });

                            return defer.promise;
                        }
                    ]
                };
            }

            function getPath(stateParams) {
                var path = ['txn'];
                angular.forEach(_tPath, function(value, key) {
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
    });
});
