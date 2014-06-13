'use strict';
define(['cabin'], function(cabin) {
    return [['directive', 'cbMaskToFull', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 1,
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
    ]], ['directive', 'cbMaskToUpperCase', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 0,
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
    ]], ['directive', 'cbMaskDate', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 0,
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
    ]], ['directive', 'cbMaskTwDate', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 1,
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

                        if (this.value.length > 6 && (new RegExp(numberChar).test(e.which))) {
                            return false;
                        }
                    }).on('blur', function(e) {
                        if (cbUtils.validDate(this.value, true)) {
                            this.value = cbUtils.formatDate(this.value, true);
                        }
                    });

                    function parse(viewValue, noRender) {
                        //rodes fix input method issue
                        ngModel.$setValidity('cbTwDate', viewValue.length === 7);
                        viewValue = viewValue.replace(/\//g, "");

                        which = -1;
                        return viewValue;
                    }

                    ngModel.$parsers.unshift(parse);
                    // ngModel.$render = function() {
                    //     var clean = parse(ngModel.$viewValue, true);
                    //     if (!clean)
                    //         element.val(clean);
                    //         return;

                    //     if(clean.length === 7){

                    //     }

                    //     cbUtils.setCaretPosition(element[0], clean.length - charPos);
                    //     return clean;
                    // };
                }
            };
        }
    ]], ['directive', 'cbMaxlength', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 0,
                link: function(scope, element, attrs, ngModel) {

                    var maxLenght = parseInt(attrs['cbMaxlength'], 10);
                    var oldValue;
                    var charPos = 0;
                    var which = 0;
                    element.on("keydown", function(e) {
                        which = e.which;
                        //fix: alaways to parse
                        ngModel.$setViewValue("");
                        oldValue = element.val();
                        var currentPos = cbUtils.getCaretPosition(this);
                        charPos = this.value.length - currentPos;
                    });

                    function parse(viewValue) {
                        if (!viewValue)
                            return viewValue;
                        //rodes fix input method issue
                        if (which != 229 && viewValue.countLength() > maxLenght) {
                            viewValue = oldValue;
                            element.val(oldValue);
                        }
                        which = -1;
                        // ngModel.$commitViewValue();
                        return viewValue;
                    }

                    ngModel.$parsers.unshift(parse);
                }
            };
        }
    ]], ['directive', 'cbNumber', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 1,
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
    ]]];
});
