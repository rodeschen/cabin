'use strict';
define(['cabin'], function(cabin) {
    return [['directive', 'cbComboBox', ['$rootScope', '$compile', '$timeout', '$parse',
        function($rootScope, $compile, $timeout, $parse) {
            return {
                priority: 100,
                restrict: 'A',
                require: 'ngModel',
                replace: false,
                scope: {
                    'ngModel': '=',
                    'comboKey': '@',
                    'dymanicKey': '@',
                    'comboType': "@"
                },

                compile: function(tElement, tAttrs, transclude) {
                    return function($scope, iElm, iAttrs, controller) {

                        var $parentScope = $scope.$parent;
                        var setModuleValue = function(value) {
                            // $scope.selectItem = value;
                            if (value.constructor === String) {
                                $parse(iAttrs.ngModel).assign($parentScope, value);
                            } else {
                                $parse(iAttrs.ngModel).assign($parentScope, value.key);
                            }
                        };
                        // copy from ui-utils;

                        function setCaretPosition(input, pos) {
                            if (input.offsetWidth === 0 || input.offsetHeight === 0) {
                                return; // Input's hidden
                            }
                            if (input.setSelectionRange) {
                                input.focus();
                                input.setSelectionRange(pos, pos);
                            } else if (input.createTextRange) {
                                // Curse you IE
                                var range = input.createTextRange();
                                range.collapse(true);
                                range.moveEnd('character', pos);
                                range.moveStart('character', pos);
                                range.select();
                            }
                        }

                        angular.extend($scope, {
                            showList: false,
                            activeIndex: -1,
                            lastIndex: -1,
                            firstItem: undefined,
                            currentItem: undefined,
                            //selectItem: undefined,
                            open: function() {
                                $scope.showList = true;
                            },
                            close: function() {
                                $scope.activeIndex = -1;
                                $scope.currentItem = undefined,
                                //$scope.selectItem = undefined,
                                $scope.showList = false;
                            },
                            isOpen: function() {
                                return $scope.showList;
                            },
                            toggle: function() {
                                $scope.reset();
                                $scope.showList = !$scope.showList;
                                iElm.focus();
                            },

                            setFirstItem: function(item) {
                                $scope.firstItem = item;
                            },
                            setLastIndex: function(index) {
                                $scope.lastIndex = index;
                            },
                            setCurrentItem: function(item) {
                                $scope.currentItem = item;
                            },
                            select: function(data) {
                                if ($scope.lastIndex === 0) {
                                    data = $scope.firstItem;
                                }
                                $timeout(function() {
                                    data = data || $scope.currentItem;
                                    if (data) {
                                        $scope.close();
                                        iElm.focus();
                                        setModuleValue(data);
                                    }
                                }, 40)
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
                            isActive: function(item, index, activeIndex, isLast) {
                                if (index === 0) {
                                    $scope.setFirstItem(item);
                                }

                                if (index === activeIndex) {
                                    $scope.setCurrentItem(item);
                                    return 'active';
                                } else if (index === -1) {
                                    $scope.setCurrentItem("");
                                }
                                if (isLast) {
                                    $scope.setLastIndex(index);
                                }
                            },
                            match: function(model) {

                                return true;
                            },
                            reset: function() {
                                setModuleValue("");
                                $scope.activeIndex = -1;
                            },
                            formatter: function() {
                                if ($scope.ngModel && $scope.items) {
                                    angular.forEach($scope.items, function(value, key) {
                                        if (value.key == $scope.ngModel) {
                                            if (value.constructor === String) {
                                                //Do nothing
                                            } else {
                                                $timeout(function() {
                                                    value && iElm.val(value.key + " - " + value.value);
                                                }, 50);
                                            }
                                            return
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
                                    if (!$scope.isOpen()) {
                                        $scope.activeIndex = -1;
                                        $scope.open();
                                    } else {
                                        if (++$scope.activeIndex > $scope.lastIndex) {
                                            $scope.activeIndex = 0;
                                        }
                                    }
                                } else if (key === 38) {
                                    $scope.activeIndex > -1 && $scope.activeIndex--;
                                    if ($scope.activeIndex === -1) {
                                        $scope.close();
                                    }
                                } else if (e.which === 13 || e.which === 9) {

                                    $scope.$apply(function() {
                                        $scope.select();
                                    });
                                } else if (e.which === 27) {
                                    // evt.stopPropagation();

                                    // resetMatches();
                                    // scope.$digest();
                                }
                                $scope.$digest();
                                e.preventDefault();
                            }
                            $timeout(function() {
                                if (key === 8) {
                                    if (!controller.$modelValue) {
                                        $scope.close();
                                    } else if ($scope.lastIndex > -1) {
                                        $scope.open();
                                    }
                                } else if (key !== 8 && key !== 38 && key !== 13 && key !== 9 && key !== 27) {
                                    ($scope.lastIndex > -1 && controller.$modelValue || key === 40) && $scope.open();
                                }
                            }, 10);
                        }).on('focus', function() {
                            $scope.ngModel && iElm.val($scope.ngModel);
                        }).on('blur', $scope.formatter);



                        var dropdownEl = angular.element('<div cb-combo-box-drop-down></div>');
                        dropdownEl.attr({
                            'ng-show': 'isOpen()'
                        });

                        var icon = angular.element('<div class="down-icon"><i class="fa  fa-1x" ng-class="ngModel?\'fa-times-circle \':\'fa-chevron-circle-down\'"></i></div>');
                        icon.attr({
                            'ng-click': 'toggle()'
                        });

                        $compile(icon.insertAfter(iElm.wrap('<lable class="combo-box-wrapper"></lable>')))($scope);
                        $compile(dropdownEl.insertAfter(iElm.parent()))($scope);
                    };
                }
            };
        }
    ]], ['directive', 'cbComboBoxDropDown', ['$rootScope', '$compile', '$timeout', 'cabinModulePath', 'cbComboBoxServ',
        function($rootScope, $compile, $timeout, cabinModulePath, comboBoxServ) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-combobox/templates/cabin-comboBox-dropdown.html',
                priority: 101,
                restrict: 'A',
                link: function($scope, iElm, iAttrs, controller) {
                    var key = $scope.dymanicKey || $scope.comboKey || '';
                    key && comboBoxServ.addKey(key, !$scope.comboKey, function(items) {
                        $scope.items = items || [];
                        $scope.formatter();
                    });
                }
            };
        }
    ]]];
});
