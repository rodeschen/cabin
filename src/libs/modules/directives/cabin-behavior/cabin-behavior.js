'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbMaskToFull', ['$filter', '$parse', 'cbUtils',
        function($filter, $parse, cbUtils) {
            return {
                require: 'ngModel',
                restrict: 'A',
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
                        if (which != 229 && !noRender ){
                            ngModel.$render();
                        }
                        which = -1 ;
                        return viewValue.toFull();
                    }
                        
                    console.log(ngModel.$render)
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
    ]];
});


