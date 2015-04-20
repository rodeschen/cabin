'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbPhrase', ['$timeout', '$window', 'cabinModulePath', 'cbPhraseServ',
        function($timeout, $window, cabinModulePath, cbPhraseServ /*,hotkey*/ ) {
            return {


                templateUrl: cabinModulePath + 'directives/cabin-phrase/templates/phrase.html',
                restrict: 'A',
                scope: {},
                replace: true,
                link: function(scope, iElement) {
                    angular.extend(scope, {
                        ngModelCtrl: null,
                        selectedGroup: null,
                        selectedPhrase: null
                    });
                    var ngModelCtrl;
                    scope.datas = cbPhraseServ.queryDatas();

                    scope.chooseGroup = function(value) {
                        scope.selectedGroup = value;

                    };
                    scope.choosePhrase = function(value) {
                        scope.selectedPhrase = value;
                    };

                    scope.setValue = function() {
                        scope.ngModelCtrl.$setViewValue(scope.ngModelCtrl.$viewValue + scope.selectedPhrase.value);
                        scope.ngModelCtrl.$render();
                        scope.ngModelCtrl = null;
                    }

                    scope.close = function() {
                        scope.ngModelCtrl = null;
                        scope.selectedGroup = null;
                        scope.selectedPhrase = null;
                    }

                    scope.$on('cbPhrase-open', function(event, data) {
                        scope.ngModelCtrl = data.ngModelCtrl;
                    });

                    scope.$on('cbPhrase-close', function(event, data) {
                        scope.close();
                    });



                }
            };
        }
    ]).service('cbPhraseServ', ['$rootScope', '$compile', '$timeout', '$http', function($rootScope, $compile, $timeout, $http) {
        var directive;
        var datas = {};
        return {
            open: function(ngModelCtrl) {
                if (ngModelCtrl) {
                    if (!directive) {
                        directive = angular.element('<div cb-phrase />').appendTo('body');
                        $compile(directive)($rootScope);
                        $timeout(function() {
                            $rootScope.$broadcast("cbPhrase-open", {
                                'ngModelCtrl': ngModelCtrl
                            });
                        }, 100);
                    } else {
                        $rootScope.$broadcast("cbPhrase-open", {
                            'ngModelCtrl': ngModelCtrl
                        });
                    }
                }

            },
            close: function() {
                $rootScope.$broadcast("cbPhrase-close");

            },
            queryDatas: function() {

                // var http = $http({
                //     url: '/basehandler/queryPhrase',
                //     method: 'POST',
                //     responseType: 'JSON',
                //     headers: {
                //         //'Content-Type': 'application/x-www-form-urlencoded'
                //         'Content-Type': 'text/plain;charset=UTF-8'
                //     }
                // }).then(function(xhr) {
                var datas = {
                    '分行中文名': {

                    },
                    '台灣城市': {
                        'C06': '台北市',
                        'C05': '新北市'
                    }
                };
                var res = [];
                for (var key in datas) {
                    res.push({
                        key: key,
                        values: (function(data) {
                            var _res = [];
                            for (var key in data) {
                                _res.push({
                                    key: key,
                                    value: data[key]
                                });
                            }
                            return _res
                        })(datas[key])
                    });
                }
                // });




                return res;
            }
        }
    }]);
})
