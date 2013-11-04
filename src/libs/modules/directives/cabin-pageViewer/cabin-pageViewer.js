'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbPageViewer', ['$rootScope', '$compile', '$timeout', 'properties', 'cbLazyRegister', 'cabinModulePath',
        function($rootScope, $compile, $timeout, properties, cbLazyRegister, cabinModulePath) {
            return {
                templateUrl: cabinModulePath + 'cabin-pageViewer/templates/pageViewer.html',
                restrict: 'AEC',
                scope: {
                    'cbPageView': '@',
                    'receiveEvent': '@'
                },
                link: function(scope, iElement) {
                    scope.includeUrl = "";
                    scope.$on(scope.receiveEvent || 'pageViewer', function(event, data) {
                        scope.includeUrl = "";
                        if (data && data.page && data.page.url) {
                            var url = data.page.url;
                            var ctrlName = url.replace(/^\//, '').split('/');
                            ctrlName = ctrlName[ctrlName.length - 1];
                            iElement.children().attr("ng-controller", ctrlName + "Ctrl").find("#includePage").attr("ng-include", "includeUrl");
                            require(["scripts/ctrl/" + url.replace(/^\//, '') + "Ctrl"], function(ctrl) {
                                cbLazyRegister.register.apply(cbLazyRegister, ctrl);
                                $compile(iElement.children())(scope);
                                scope.includeUrl = "views/" + url.replace(/^\//, '') + ".html";
                                scope.$apply();
                            });
                        }
                    });
                }
            };
        }
    ]];
});
