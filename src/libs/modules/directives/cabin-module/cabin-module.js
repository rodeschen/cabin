'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbModule', ['$rootScope', '$compile', '$timeout', '$document', 'cbLazyRegisterServ',
        function($rootScope, $compile, $timeout, $document, cbLazyRegister) {
            return {
                restrict: 'A',
                // scope: {
                //     'cbModule': "@"
                //     //,'cbEvent': "@"
                // },
                link: function(scope, iElement, iAttrs) {
                    var module = iAttrs.cbModule.replace(/[A-Z]/g, function(value) {
                        return "-" + value.toLocaleLowerCase();
                    });
                    var subElement = iElement; //angular.element("<div />");
                    subElement.attr(module, iAttrs.cbModule);
                    //iElement.append(subElement);
                    iElement.removeAttr('cb-module');
                    iElement.removeAttr('cb-event');
                    //if (!require.defined(iAttrs.cbModule)) {
                    require([iAttrs.cbModule], function(module) {
                        var modules;
                        if (module[0].constructor === String) {
                            modules = [module];
                        } else if (module[0].constructor === Array) {
                            modules = module;
                        }
                        if (modules) {
                            angular.forEach(modules, function(value, key) {
                                cbLazyRegister.register.apply(cbLazyRegister, value);
                            });

                            $compile(subElement)(scope);
                        }
                    });
                    //}
                }
            };
        }
    ]];
});
