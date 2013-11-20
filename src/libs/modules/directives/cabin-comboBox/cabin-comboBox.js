'use strict';
define(['cabin'], function(cabin) {
    return [['directive', 'cbComboBox', ['$rootScope', '$compile', '$timeout', '$parse', 'cabinModulePath',
        function($rootScope, $compile, $timeout, $parse, cabinModulePath) {
            return {
                //priority: 0,
                restrict: 'A',
                require: 'ngModel',
                templateUrl: cabinModulePath + 'directives/cabin-combobox/templates/cabin-comboBox.html',
                replace: true,
                scope: {
                    'ngModel': '=ngModel',
                    'comboKey': '@',
                    'dymanicKey': '@',
                    'comboType': '@'
                },
                link: function($scope, iElm, iAttrs, controller) {
                    iElm = iElm.find('input');
                    iElm.addClass(iAttrs.class || '').attr(iAttrs.css || '');

                    var local = {
                        isFocus: false,
                        $parentScope: $scope.$parent,
                        setModuleValue: function(value) {
                            if (value.constructor === String) {
                                $scope.ngModel = value;
                            } else {
                                $scope.ngModel = value.key;
                            }
                        }
                    };


                    angular.extend($scope, {
                        showList: false,
                        activeIdx: -1,
                        items: [],
                        matchs: [],
                        open: function() {
                            if (!$scope.showList) {
                                $scope.showList = true;
                                $scope.activeIdx = 0;
                            }
                        },
                        close: function() {
                            if ($scope.showList) {
                                $scope.matchs = [];
                                $scope.activeIdx = -1;
                                $scope.showList = false;
                            }
                        },
                        isOpen: function() {
                            return $scope.showList;
                        },
                        toggle: function() {

                            if ($scope.isOpen()) {
                                $scope.close();
                            } else {
                                $scope.match('');
                                $scope.open();
                                iElm.focus();
                            }
                            local.setModuleValue('');
                        },
                        getMatchLength: function() {
                            return $scope.matchs.length;
                        },
                        getNgModelValue: function() {
                            return controller.$viewValue;
                        },
                        match: function(input) {
                            var mValue = input === undefined && $scope.getNgModelValue() || input;
                            var _matchs = [];
                            if (mValue) {
                                angular.forEach($scope.items, function(value, key) {
                                    if (value.constructor === String) {
                                        reg.test(value) && _matchs.push(value)
                                    } else {
                                        if (new RegExp(mValue, 'gi').test(value.key) || new RegExp(mValue, 'gi').test(value.value)) {
                                            _matchs.push(value);
                                        }
                                    }
                                });
                                $scope.matchs = _matchs;
                            } else {
                                $scope.matchs = $scope.items;
                            }
                            $scope.indexIdx = ($scope.matchs.length ? 0 : -1);
                        },
                        select: function(index) {
                            if (index === undefined) {
                                index = $scope.activeIdx;
                            }

                            if ($scope.matchs.length) {
                                local.setModuleValue($scope.matchs[index]);
                                $scope.close();
                                iElm.focus();
                            }
                        },
                        showStyle: function(data) {
                            if (data.constructor === String) {
                                return data;
                            } else {
                                switch ($scope.comboType || '3') {
                                    case '1':
                                        return data.key;
                                    default:
                                        return data.key + ' - ' + data.value;
                                }
                            }

                        },
                        formatter: function() {
                            var v = $scope.getNgModelValue();
                            if (v && $scope.items && !local.isFocus) {
                                angular.forEach($scope.items, function(value, key) {
                                    if (value.key == v) {
                                        if (value.constructor === String) {
                                            //Do nothing
                                        } else {
                                            value && iElm.val($scope.showStyle(value));
                                        }
                                    }
                                });
                            }
                        }
                    });

                    var keys = [40, 38, 18, 9, 27, 13];
                    //up(38) / down(40), enter(13) and tab(9), esc(27)
                    iElm.on('keydown', function(e) {
                        var key = e.which;
                        if (key == 40 || $scope.isOpen() && keys.indexOf(key) > -1) {
                            if (key === 40) {
                                $scope.activeIdx++;
                                if (!$scope.isOpen()) {
                                    $scope.match();
                                    $scope.open();
                                } else {

                                    if ($scope.activeIdx >= $scope.getMatchLength()) {
                                        $scope.activeIdx = 0;
                                    }
                                }
                            } else if (key === 38) {
                                if (--$scope.activeIdx === -1) {
                                    $scope.close();
                                }
                            } else if (e.which === 13 || e.which === 9) {
                                $scope.$apply(function() {
                                    $scope.select($scope.activeIdx);
                                });
                            } else if (e.which === 27) {
                                $scope.close();
                            }
                            $scope.$digest();
                            e.preventDefault();
                        }
                    }).on('keyup', function(e) {
                        var key = e.which;
                        if (!(keys.indexOf(key) > -1)) {
                            if (!$scope.isOpen() && $scope.getNgModelValue()) {
                                $scope.open();
                            }
                            $scope.match();
                            $scope.$digest();
                        }
                    }).on('focus', function() {
                        local.isFocus = true;
                        $scope.ngModel && iElm.val(controller.$viewValue);
                    }).on('blur', function() {
                        local.isFocus = false;
                        $scope.formatter();
                        //確保已離開
                        $timeout(function() {
                            if (!local.isFocus) {
                                $scope.close();
                            }
                        }, 50)
                    });
                    $scope.$watch('getNgModelValue()', $scope.formatter);
                }
            };
        }
    ]], ['directive', 'cbComboBoxDropDown', ['cabinModulePath', 'cbComboBoxServ',
        function(cabinModulePath, comboBoxServ) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-combobox/templates/cabin-comboBox-dropdown.html',
                priority: 101,
                restrict: 'A',
                link: function($scope, iElm, iAttrs, controller) {
                    var key = $scope.dymanicKey || $scope.comboKey || '';
                    key && comboBoxServ.addKey(key, !$scope.comboKey, function(items) {
                        $scope.items = items || [];
                        $scope.match($scope.getNgModelValue());
                        $scope.formatter();
                    });
                }
            };
        }
    ]]];
});
