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

                    element.on("keydown", function(e) {
                        //String.char
                        currentPos = cbUtils.getCaretPosition(this);
                        charPos = this.value.length - currentPos;
                        //如果為「逗號」則shift 一位
                        if (e.which === 8 && currentPos > 0 && this.value.substr(currentPos - 1, 1) === ',') {
                            charPos++;
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
                        ngModel.$modelValue = clean;
                        return clean;
                    }

                    ngModel.$parsers.unshift(parse);
                    // ngModel.$formatters.push(function(v) {
                    //   return v;
                    // });
                    ngModel.$render = function() {
                        var clean = parse(ngModel.$viewValue, true);
                        if (!clean)
                            return;
                        var currencyValue,
                            dotSplit = clean.split('.');

                        // todo: refactor, this is ugly
                        if (clean[clean.length - 1] === '.') {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean)) + '.';

                        } else if (clean.indexOf('.') != -1 && dotSplit[dotSplit.length - 1].length == 1) {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean), 1);
                        } else if (clean.indexOf('.') != -1 && dotSplit[dotSplit.length - 1].length == 1) {
                            currencyValue = /*'$' + */ $filter('number')(parseFloat(clean), 2);
                        } else {
                            currencyValue = /*'$' +*/ $filter('number')(parseFloat(clean));
                        }
                        element.val(currencyValue);
                        cbUtils.setCaretPosition(element[0], currencyValue.length - charPos)
                    };
                }
            };
        }
    ]];
});
