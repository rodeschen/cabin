'use strict';
define(['cabin'], function(cabin) {
    return [['directive', 'cbComboBox', ['$rootScope', '$compile', '$timeout', '$parse',
        function($rootScope, $compile, $timeout, $parse) {
            return {
                //priority: 0,
                restrict: 'A',
                require: 'ngModel',
                //replace: false,
                // scope: {
                //     'ngModel': '=',
                //     'comboKey': '@',
                //     'dymanicKey': '@',
                //     'comboType': "@"
                // },

                link: function($parentScope, iElm, iAttrs, controller) {
                    var $scope = $parentScope.$new();
                    angular.extend($scope, {
                        ngModel: $parse(iAttrs.ngModel),
                        comboKey: iAttrs.comboKey,
                        dymanicKey: iAttrs.dymanicKey,
                        comboType: iAttrs.comboType
                    })
                    var local = {
                        isFocus: false,
                        $parentScope: $scope.$parent,
                        setModuleValue: function(value) {
                            // $scope.selectItem = value;
                            if (value.constructor === String) {
                                $parse(iAttrs.ngModel).assign($parentScope, value);
                            } else {
                                $parse(iAttrs.ngModel).assign($parentScope, value.key);
                            }
                        }
                    }

                    // controller.$formatters.push(function(input) {
                    //     $scope.match(input);
                    //     if (local.isFocus) {
                    //         if (input && $scope.matchs.length) {
                    //             $scope.open();
                    //         } else if (!input) {
                    //             $scope.close();
                    //         }
                    //     }
                    //     return input;
                    // })

                    // copy from ui-utils;

                    // function setCaretPosition(input, pos) {
                    //     if (input.offsetWidth === 0 || input.offsetHeight === 0) {
                    //         return; // Input's hidden
                    //     }
                    //     if (input.setSelectionRange) {
                    //         input.focus();
                    //         input.setSelectionRange(pos, pos);
                    //     } else if (input.createTextRange) {
                    //         // Curse you IE
                    //         var range = input.createTextRange();
                    //         range.collapse(true);
                    //         range.moveEnd('character', pos);
                    //         range.moveStart('character', pos);
                    //         range.select();
                    //     }
                    // }

                    angular.extend($scope, {
                        showList: false,
                        activeIdx: -1,
                        items: [],
                        matchs: [],
                        // lastIdx: -1,
                        // firstItem: undefined,
                        // currentItem: undefined,
                        //selectItem: undefined,
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
                            local.setModuleValue('');
                            if ($scope.isOpen()) {
                                $scope.close();
                            } else {
                                $scope.match('');
                                $scope.open();
                                iElm.focus();
                            }
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
                                        return
                                    }
                                });
                            }
                        }
                    });

                    var keys = [40, 38, 18, 9, 27, 13];
                    //up(38) / down(40), enter(13) and tab(9), esc(27)
                    iElm.bind('keydown', function(e) {
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


                    var dropdownEl = angular.element('<div cb-combo-box-drop-down></div>');
                    dropdownEl.attr({
                        'ng-show': 'isOpen()'
                    });

                    var icon = angular.element('<div class="down-icon"><i class="fa  fa-1x" ng-class="getNgModelValue()?\'fa-times-circle \':\'fa-chevron-circle-down\'"></i></div>');
                    icon.attr({
                        'ng-click': 'toggle()'
                    });

                    $compile(icon.insertAfter(iElm.wrap('<lable class="combo-box-wrapper"></lable>')))($scope);
                    $compile(dropdownEl.insertAfter(iElm.parent()))($scope);
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
