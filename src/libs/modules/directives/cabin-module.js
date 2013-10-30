'use strict';
define(['cabin'], function(cabin) {
    window.aaa = cabin;
    return cabin.directive('cbModule', ['$rootScope', '$compile', '$timeout', '$document', 'cbLazyRegister',
        function($rootScope, $compile, $timeout, $document, cbLazyRegister) {
            return {
                restrict: 'A',
                scope: {
                    'cbModule': "@"
                    //,'cbEvent': "@"
                },
                link: function(scope, iElement) {
                    var module = scope.cbModule.replace(/[A-Z]/g, function(value) {
                        return "-" + value.toLocaleLowerCase();
                    });
                    var subElement = iElement; //angular.element("<div />");
                    subElement.attr(module, scope.cbModule);
                    //iElement.append(subElement);
                    iElement.removeAttr('cb-module');
                    iElement.removeAttr('cb-event');
                    //if (!require.defined(scope.cbModule)) {
                        require([scope.cbModule], function(directive) {
                            cbLazyRegister.directive(scope.cbModule, directive);
                            $compile(subElement)($rootScope);
                        });
                    //}
                }
            };
        }
    ]);
});
