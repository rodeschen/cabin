'use strict';
define(['cabin'], function(cabin) {
    return cabin.directive('cbModule', ['$rootScope', '$compile', '$timeout', '$document', 'cabinModuleTemplatePath', 'cbLazyRegister',
        function($rootScope, $compile, $timeout, $document, templatePath, cbLazyRegister) {
            return {
                restrict: 'A',
                scope: {
                    'cbModule': "@",
                    'cbEvent': "@"
                },
                link: function(scope, iElement) {
                    var module = scope.cbModule.replace(/[A-Z]/g, function(value) {
                        return "-" + value.toLocaleLowerCase();
                    });
                    var subElement = angular.element("<div />");
                    subElement.attr(module, scope.cbEvent || scope.cbModule);
                    iElement.append(subElement);
                    require([scope.cbModule], function(directive) {
                        cbLazyRegister.directive(scope.cbModule, directive);
                        $compile(subElement)(scope);
                    });
                }
            };
        }
    ]);
});
