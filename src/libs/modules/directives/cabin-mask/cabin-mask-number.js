'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbMaskNumber', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function(scope, element, attrs, ngModel) {
                    // var negative =
                    var charPos = 0;
                    var currentPos = 0;
                    var val,keyIn;
                    var validChar = "^(4[8-9]|5[0-7]|" +  // "0-9" number
                        "189|" +  // "-" negative 
                        "8|" + // backspace
                        "9|" + // tab
                        "3[79]|" + // → ←
                        "13)$"; // enter

                    element.on("keydown", function(e) {
                        //console.log(e.which)
                        val = element.val();
                        currentPos = cbUtils.getCaretPosition(this);
                        charPos = this.value.length - currentPos;

                        //如果為「逗號」則shift 一位 keyCode-8-backspace
                        if (e.which === 8 && currentPos > 0 && this.value.substr(currentPos - 1, 1) === ',') {
                            charPos++;
                            return;
                        }

                        //ignore invalid char 
                        if(!(new RegExp(validChar).test(e.which))){
                            return false;
                        }

                        if(189 == e.which && (currentPos != 0 || /^-/.test(val))){
                            return false;
                        }
                    });


                    function parse(viewValue, noRender) {
                        if (!viewValue)
                            return viewValue;
                        // strips all non digits leaving periods.
                        var clean = viewValue.replace(/[^0-9.]+/g, '').replace(/\.{2,}/, '.');
                        // case for users entering multiple periods throughout the number

                        var dotSplit = clean.split('.');
                        if (dotSplit.length > 2) {
                            clean = dotSplit[0] + '.' + dotSplit[1].slice(0, 2);
                        } else if (dotSplit.length == 2) {
                            clean = dotSplit[0] + '.' + dotSplit[1].slice(0, 2);
                        }

                         if (!noRender)
                             ngModel.$render();

                        // fix angualr 1.2.16
                        //ngModel.$modelValue = clean;
                        return (/^-/.test(viewValue) ? '-':'') + clean;
                    }

                    ngModel.$parsers.unshift(parse);
                    ngModel.$render = function() {
                        var clean = parse(ngModel.$viewValue, true);
                        console.log("ADFADFSAF",clean)

                        if (!clean)
                            return;
                        if(/^-$/.test(clean)){
                            element.val(clean);
                            return;
                        }
                        var currencyValue,
                            dotSplit = clean.split('.');

                        // todo: refactor, this is ugly
                        if (clean[clean.length - 1] === '.') {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean,10)) + '.';

                        } else if (clean.indexOf('.') != -1 && dotSplit[dotSplit.length - 1].length == 1) {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean,10), 1);
                        } else if (clean.indexOf('.') != -1 && dotSplit[dotSplit.length - 1].length == 1) {
                            currencyValue = /*'$' + */ $filter('number')(parseFloat(clean,10), 2);
                        } else {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean,10));
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
