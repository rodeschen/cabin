'use strict';
define(['cabin'], function(cabin) {
    return [
        ['directive', 'cbMaskToFull', ['$filter', '$parse', 'cbUtils',
            function($filter, $parse, cbUtils) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    priority: 2,
                    link: function(scope, element, attrs, ngModel) {

                        var charPos = 0;
                        var which = 0;
                        element.on("keydown", function(e) {
                            which = e.which;
                            var val = element.val();
                            var currentPos = cbUtils.getCaretPosition(this);
                            charPos = this.value.length - currentPos;
                        });

                        function parse(viewValue, noRender) {
                            if (!viewValue)
                                return viewValue;
                            //rodes fix input method issue
                            if (which != 229 && !noRender) {
                                ngModel.$render();
                            }
                            which = -1;
                            return viewValue.toFull();
                        }

                        ngModel.$parsers.unshift(parse);
                        ngModel.$render = function() {
                            var clean = parse(ngModel.$viewValue, true);
                            if (!clean)
                                return;
                            element.val(clean.toFull());
                            cbUtils.setCaretPosition(element[0], clean.length - charPos);
                            return clean;
                        };
                    }
                };
            }
        ]],
        ['directive', 'cbMaskToUpperCase', ['$filter', '$parse', 'cbUtils',
            function($filter, $parse, cbUtils) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    priority: 2,
                    link: function(scope, element, attrs, ngModel) {
                        var charPos = 0;
                        var which = 0;
                        element.on("keydown", function(e) {
                            which = e.which;
                            var val = element.val();
                            var currentPos = cbUtils.getCaretPosition(this);
                            charPos = this.value.length - currentPos;
                        });

                        function parse(viewValue, noRender) {
                            //rodes fix input method issue
                            if (which != 229 && !noRender) {
                                ngModel.$render();
                            }
                            which = -1;
                            return viewValue ? viewValue.toUpperCase() : viewValue;
                        }

                        ngModel.$parsers.unshift(parse);
                        ngModel.$render = function() {
                            var clean = parse(ngModel.$viewValue, true);
                            element.val(clean);
                            if (!clean)
                                return;
                            cbUtils.setCaretPosition(element[0], clean.length - charPos);
                            return clean;
                        };
                    }
                };
            }
        ]],
        ['directive', 'cbMaskDate', ['$filter', '$parse', 'cbUtils',
            function($filter, $parse, cbUtils) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    priority: 2,
                    link: function(scope, element, attrs, ngModel) {

                        var charPos = 0;
                        var which = 0;
                        var validChar = "^(" + [
                            "8", // backspace
                            "9", // tab
                            "3[79]", // → ←
                            //  "190",
                            "13" // enter
                        ].join("|") + ")$";

                        var numberChar = "^(4[8-9]|5[0-7])$";

                        element.on('focus', function(e) {
                            this.value = this.value.replace(/\//g, "");
                        }).on("keydown", function(e) {

                            which = e.which;
                            if (!(new RegExp(validChar).test(e.which)) && !(new RegExp(numberChar).test(e.which))) {
                                return false;
                            }

                            if (this.value.length > 7 && (new RegExp(numberChar).test(e.which))) {
                                return false;
                            }
                        }).on('blur', function(e) {
                            if (cbUtils.validDate(this.value)) {
                                this.value = cbUtils.formatDate(this.value);
                            }
                        });

                        function parse(viewValue, noRender) {
                            viewValue = viewValue.replace(/\//g, "");
                            ngModel.$setValidity('cbDate', viewValue.length === 8);
                            which = -1;
                            return viewValue;
                        }

                        ngModel.$parsers.unshift(parse);
                    }
                };
            }
        ]],
        ['directive', 'cbMaskTwDate', ['$filter', '$parse', 'cbUtils',
            function($filter, $parse, cbUtils) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    priority: 2,
                    link: function(scope, element, attrs, ngModel) {
                        console.log("")
                        var convertToAd = attrs.convertToAd == "true" || false;
                        var charPos = 0;
                        var which = 0;
                        var isFocus = false;
                        var validChar = "^(" + [
                            "8", // backspace
                            "9", // tab
                            "3[79]", // → ←
                            //  "190",
                            "13" // enter
                        ].join("|") + ")$";

                        var numberChar = "^(4[8-9]|5[0-7])$";

                        element
                            .on('focus', function(e) {
                                this.value = this.value.replace(/\//g, "");
                                isFocus = true;
                            })
                            .on("keydown", function(e) {

                                which = e.which;
                                if (!(new RegExp(validChar).test(e.which)) && !(new RegExp(numberChar).test(e.which))) {
                                    return false;
                                }

                                if (this.value.length > 6 && (new RegExp(numberChar).test(e.which))) {
                                    return false;
                                }
                            })
                            .on('blur', function(e) {
                                if (cbUtils.validDate(this.value, true)) {
                                    this.value = cbUtils.formatDate(this.value, true);
                                }
                                isFocus = false;
                            });

                        function parse(viewValue, noRender) {
                            //rodes fix input method issue
                            if (viewValue) {
                                ngModel.$setValidity('cbTwDate', cbUtils.validDate(viewValue, true));
                                viewValue = viewValue.replace(/\//g, "");
                                if (convertToAd) {
                                    viewValue = cbUtils.convertAdAndTw(viewValue, true);
                                }
                                if (!noRender)
                                    ngModel.$render();

                                which = -1;
                            }
                            return viewValue;
                        }

                        ngModel.$parsers.unshift(parse);

                        if (convertToAd) {
                            ngModel.$formatters.push(function(viewValue) {
                                if (viewValue) {
                                    viewValue = viewValue.replace(/\//g, "");
                                    var valid = cbUtils.validDate(viewValue, false);
                                    ngModel.$setValidity('cbTwDate', valid);
                                    if (valid) {
                                        viewValue = cbUtils.convertAdAndTw(viewValue, false);
                                        //element.val(viewValue) = cbUtils.formatDate(viewValue, true);
                                    }
                                }

                                return viewValue;
                            });
                        }

                        ngModel.$render = function() {
                            var clean = parse(ngModel.$viewValue, true);
                            if (!isFocus) {
                                if (cbUtils.validDate(clean, false)) {
                                    element.val(cbUtils.formatDate(cbUtils.convertAdAndTw(clean, false), true));
                                } else {
                                    element.val(element.val().replace(/\//g, ""));
                                }
                            }
                            return clean;
                        };


                    }
                };
            }
        ]],
        ['directive', 'cbMaxlength', ['$filter', '$parse', 'cbUtils', '$timeout',
            function($filter, $parse, cbUtils, $timeout) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    priority: 1,
                    link: function(scope, element, attrs, ngModel) {

                        var maxLength = parseInt(attrs['cbMaxlength'], 10);
                        var maxLengthDouble = maxLength; //parseInt((attrs['cbMaxlengthDouble']) || (maxLength), 10);
                        var oldValue;
                        var charPos = 0;
                        var which = 0;
                        element.on("keydown", function(e) {
                            which = e.which;
                            //fix: alaways to parse
                            // if (which !== 9 && which !== 13) {
                            //     ngModel.$setViewValue("");
                            // }
                            //console.log(e);
                            oldValue = element.val();
                            var currentPos = cbUtils.getCaretPosition(this);
                            charPos = this.value.length - currentPos;
                            $timeout(function() {
                                var value = ngModel.$viewValue || "";
                                var checkLength = (value.getDouble() || []).length ? maxLengthDouble : maxLength;
                                if (value.countLength() > checkLength) {
                                    while (value.countLength() > checkLength) {
                                        value = value.replace(/.$/, '');
                                    }

                                    ngModel.$setViewValue(value);
                                    element.val(value);
                                }
                            }, 50);
                        });

                        // function parse(viewValue) {
                        //     if (!viewValue)
                        //         return viewValue;
                        //     //rodes fix input method issue


                        //     which = -1;
                        //     // ngModel.$commitViewValue();
                        //     return viewValue;
                        // }

                        // ngModel.$parsers.unshift(parse);
                    }
                };
            }
        ]],
        ['directive', 'cbNumber', ['$filter', '$parse', 'cbUtils',
            function($filter, $parse, cbUtils) {
                return {
                    require: 'ngModel',
                    restrict: 'A',
                    priority: 2,
                    link: function(scope, element, attrs, ngModel) {
                        var validChar = "^(" + ["4[8-9]|5[0-7]", + // "0-9" number
                            "189", // "-" negative 
                            "8", // backspace
                            "9", // tab
                            "3[79]", // → ←
                            //"190",  //.
                            "13" // enter
                        ].join("|") + ")$";

                        element.on("keydown", function(e) {
                            var which = e.which;
                            if (!(new RegExp(validChar).test(e.which))) {
                                return false;
                            }
                        });

                    }
                };
            }
        ]],
        ['directive', 'cbFocus', ['$timeout',
            function($timeout) {
                return {
                    restrict: 'AC',
                    link: function(scope, element, attrs) {;
                        scope.$watch(attrs.cbFocus,
                            function(v) {
                                $timeout(function() {
                                    v && element.focus();
                                }, 400);
                            });
                    }
                };
            }
        ]]
    ];
});
