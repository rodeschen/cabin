'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbMaskNumber', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                priority: 2,
                link: function(scope, element, attrs, ngModel) {
                    // var negative =
                    var fraction = parseInt(attrs.fraction || 4);
                    var charPos = 0;
                    var currentPos = 0;
                    var negative = attrs.negative === 'Y'
                    var val, keyIn;
                    var validChar = "^(" + ["4[8-9]|5[0-7]", + // "0-9" number
                        "189", // "-" negative 
                        "8", // backspace
                        "9", // tab
                        "3[79]", // → ←
                        "190",
                        "13" // enter
                    ].join("|") + ")$";

                    element.on("keydown", function(e) {

                        val = element.val();
                        currentPos = cbUtils.getCaretPosition(this);
                        charPos = this.value.length - currentPos;

                        //如果為「逗號」則shift 一位 keyCode-8-backspace
                        if (e.which === 8 && currentPos > 0 && this.value.substr(currentPos - 1, 1) === ',') {
                            charPos++;
                            return;
                        }
                        if (e.which === 48 && charPos === 0 && val.match(/[.]0$/)) {
                            return false;
                        }

                        //ignore invalid char 
                        if (!(new RegExp(validChar).test(e.which))) {
                            return false;
                        }
                        if (/4[8-9]|5[0-7]/.test(e.which) && (charPos < (fraction + 1)) && val.match("[.][0-9]{" + fraction + "}$")) {
                            return false;
                        }

                        if (189 == e.which && (!negative || currentPos != 0 || /^-/.test(val))) {
                            return false;
                        }
                        if (e.which === 190 && this.value.indexOf(".") > 0) {
                            return false;
                        }
                        //fix: alaways to parse 修正重復輸入時不會執行format資料
                        if (e.which !== 9 && e.which !== 13) {
                            //  ngModel.$setViewValue("");
                        }
                    });


                    function parse(viewValue, noRender) {
                        if (!viewValue)
                            return viewValue;
                        // strips all non digits leaving periods.
                        var clean = viewValue.replace(/[^0-9.]+/g, '').replace("\.{" + fraction + ",}", '.');
                        // case for users entering multiple periods throughout the number

                        var dotSplit = clean.split('.');
                        if (dotSplit.length > 2) {
                            clean = dotSplit[0] + '.' + dotSplit[1].slice(0, fraction);
                        } else if (dotSplit.length == 2) {
                            clean = dotSplit[0] + '.' + dotSplit[1].slice(0, fraction);
                        }

                        if (!noRender)
                            ngModel.$render();

                        // fix angualr 1.2.16
                        //ngModel.$modelValue = clean;
                        var resValue = (/^-/.test(viewValue) ? '-' : '') + clean;
                        return resValue;
                    }

                    ngModel.$parsers.unshift(parse);
                    ngModel.$render = function() {
                        var clean = parse(ngModel.$viewValue, true);

                        if (!clean)
                            return;
                        if (/^-$/.test(clean)) {
                            element.val(clean);
                            return;
                        }
                        var currencyValue,
                            dotSplit = clean.split('.');
                            // todo: refactor, this is ugly
                        if (clean[clean.length - 1] === '.') {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean, 10)) + '.';
                        } else if (clean.indexOf('.') != -1 && dotSplit[dotSplit.length - 1].length) {
                            var length = dotSplit[dotSplit.length - 1].length;
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean, 10), length > fraction ? fraction : length);
                        } else {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean, 10));
                        }
                        element.val(currencyValue);
                        cbUtils.setCaretPosition(element[0], currencyValue.length - charPos);
                        return clean;
                    };
                }
            };
        }
    ]];
});
