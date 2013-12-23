'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbMask', ['$filter', '$parse', '$timeout',
        function($filter, $parse) {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function(scope, element, attrs, ngModel) {

                    function parse(viewValue, noRender) {

                        if (!viewValue)
                            return viewValue;
                        console.log("parse", viewValue)
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
                        ngModel.$modelValue = clean > 1000 ? "999" : clean;
                        return clean > 1000 ? "999" : clean;
                    }

                    ngModel.$parsers.unshift(parse);
                    ngModel.$formatters.push(function(v){
                        console.log("formatter",v);
                        return ((v?v*1:0) + 1000) + "";
                    })
                    ngModel.$render = function() {
                        var clean = parse(ngModel.$viewValue, true);
                        if (!clean)
                            return;

                        var currencyValue,
                            dotSplit = clean.split('.');

                        // todo: refactor, this is ugly
                        if (clean[clean.length - 1] === '.') {
                            currencyValue = '$' + $filter('number')(parseFloat(clean)) + '.';

                        } else if (clean.indexOf('.') != -1 && dotSplit[dotSplit.length - 1].length == 1) {
                            currencyValue = '$' + $filter('number')(parseFloat(clean), 1);
                        } else if (clean.indexOf('.') != -1 && dotSplit[dotSplit.length - 1].length == 1) {
                            currencyValue = '$' + $filter('number')(parseFloat(clean), 2);
                        } else {
                            currencyValue = '$' + $filter('number')(parseFloat(clean));
                        }

                        element.val(currencyValue);

                        console.log('viewValue', ngModel.$viewValue);
                        console.log('modelValue', ngModel.$modelValue);
                    };

                }
            };
        }
    ]];
});
