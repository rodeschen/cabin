'use strict';
define(['cabin'], function() {
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
                    'comboList': '=',
                    'dymanicKey': '@',
                    'comboType': '@',
                    'edit': '@'
                },
                link: function($scope, iElm, iAttrs, controller) {
                    var isRequired = iElm.is('[required]');
                    controller.$label = iAttrs.label || "";
                    var sourceEl = iElm;
                    iElm = iElm.find('input');
                    //init attrs
                    if (iAttrs.autofocus !== undefined) {
                        iElm.focus();
                    }
                    if(iAttrs.placeholder){
                        iElm.attr('placeholder',iAttrs.placeholder);    
                    }
                    iElm.addClass(iAttrs.class || '').attr(iAttrs.css || '');

                    $scope.comboViewItems = iAttrs.comboViewItems || 4;
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
                            if (iElm.prop('readonly') || iElm.prop('disabled')) {
                                return;
                            }
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
                            if (mValue && $scope.isEdit()) {
                                angular.forEach($scope.items, function(value) {
                                    if (value.constructor === String) {
                                        new RegExp(mValue, 'gi').test(value) && _matchs.push(value);
                                    } else if (new RegExp(mValue, 'gi').test(value.key) || new RegExp(mValue, 'gi').test(value.value)) {
                                        _matchs.push(value);
                                    }

                                });
                                $scope.matchs = _matchs;
                                
                            } else {
                                $scope.matchs = $scope.items;
                            }
                            $scope.indexIdx = ($scope.matchs.length ? 0 : -1);
                            $scope.checkValid();
                        },
                        isEdit: function() {
                            return $scope.edit !== 'false';
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
                            $scope.checkValid();
                        },
                        checkValid: function() {
                            //暫解
                            $timeout(function() {
                                var val = $scope.getNgModelValue();
                                for (var i = 0; i < $scope.items.length; i++) {
                                    if (val == $scope.items[i].key) {
                                        controller.$setValidity('cbComboBox', true);
                                        return
                                    }
                                }
                                if(!isRequired && !val){
                                    controller.$setValidity('cbComboBox', true);    
                                }else{
                                    controller.$setValidity('cbComboBox', false);
                                }
                            }, 60);

                        },
                        showStyle: function(data) {
                            if (data.constructor === String) {
                                return data;
                            } else {
                                switch ($scope.comboType || '3') {
                                    case '1':
                                        return data.key;
                                    case '2':
                                        return data.value;
                                    default:
                                        return data.key + ' - ' + data.value;
                                }
                            }

                        },
                        formatter: function() {
                            var v = $scope.getNgModelValue();
                            if (v && $scope.items && !local.isFocus) {
                                angular.forEach($scope.items, function(value) {
                                    if (value.key === v) {
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
                        if (key === 40 || $scope.isOpen() && keys.indexOf(key) > -1) {
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
                        if (!$scope.isEdit() && keys.indexOf(key) === -1) {
                            e.preventDefault();
                        }
                    }).on('keyup', function(e) {

                        var key = e.which;
                        if (keys.indexOf(key) === -1) {
                            if (!$scope.isOpen() && $scope.getNgModelValue()) {
                                $scope.open();
                            }
                            $scope.match();
                            $scope.$digest();
                        }
                    }).on('focus', function() {
                        local.isFocus = true;
                        $scope.ngModel && iElm.val(controller.$viewValue);
                        iElm.closest('[cb-combo-box]').addClass('cb-focus');
                    }).on('blur', function() {
                        local.isFocus = false;
                        $scope.formatter();
                        // change to 500ms for waiting click event fire 
                        $timeout(function() {
                            if (!local.isFocus) {
                                $scope.close();
                            }
                        }, 500);
                        iElm.closest('[cb-combo-box]').removeClass('cb-focus');
                    });

                    $scope.$watch('getNgModelValue()', $scope.formatter);



                }
            };
        }
    ]], ['directive', 'cbComboBoxDropDown', ['cabinModulePath', 'cbComboBoxServ', '$timeout',
        function(cabinModulePath, comboBoxServ, $timeout) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-combobox/templates/cabin-comboBox-dropdown.html',
                priority: 101,
                restrict: 'A',
                link: function($scope, iElm) {
                    var listContent = iElm.find(".combo-box-list");
                    if ($scope.comboList) {
                        $scope.items = $scope.comboList || [];
                        $scope.match($scope.getNgModelValue());
                        $scope.formatter();
                    } else {
                        var key = $scope.dymanicKey || $scope.comboKey || '';
                        key && comboBoxServ.addKey(key, !$scope.comboKey, function(items) {
                            $scope.items = items || [];
                            $scope.match($scope.getNgModelValue());
                            $scope.formatter();
                        });
                    }
                    $scope.$watch('activeIdx', function(nVal, oVal) {
                        $timeout(function() {
                            var activeEl = listContent.find('li.active');
                            if (activeEl.size()) {
                                // refrenence to selectize.js
                                var height_menu = listContent.height();
                                var height_item = activeEl.outerHeight(true);
                                var scroll = listContent.scrollTop() || 0;
                                var y = activeEl.offset().top - listContent.offset().top + scroll;
                                var scroll_top = y;
                                var scroll_bottom = y - height_menu + height_item;

                                // console.log("y", y, activeEl[0]);
                                // console.log("height_item", height_item);
                                // console.log("scroll", scroll);
                                // console.log("height_menu", height_menu, listContent[0]);
                                // console.log("---------------------------");

                                if (y + height_item > height_menu + scroll) {
                                    listContent.scrollTop(scroll_bottom);
                                    // self.$dropdown_content.stop().animate({
                                    //     scrollTop: scroll_bottom
                                    // }, animate ? self.settings.scrollDuration : 0);
                                } else if (y < scroll) {
                                    listContent.scrollTop(scroll_top);
                                    // self.$dropdown_content.stop().animate({
                                    //     scrollTop: scroll_top
                                    // }, animate ? self.settings.scrollDuration : 0);
                                }

                            }
                        }, 50);
                    });
                    var maxHeight = 0;
                    $scope.$watch('showList', function(nVal) {
                        if (maxHeight > 0)
                            return;
                        $timeout(function() {
                            var itemHeight = listContent.find('li:first').outerHeight(true);
                            if (itemHeight) {
                                maxHeight = (itemHeight * $scope.comboViewItems) + 8;
                                listContent.css('maxHeight', maxHeight);
                            }
                        }, 50);
                    });

                }
            };
        }
    ]]];
});
