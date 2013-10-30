'use strict';
define(['cabin'], function(cabin) {
    return ['$rootScope', '$timeout', 'properties', 'cbLazyRegister',
        function($rootScope, $timeout, properties, cbLazyRegister) {
            return {
                template: '<div class="page-viewer"><div id="incPage" ng-include="incPage" class="toggle">dd</div></div>',
                restrict: 'AEC',
                scope: {
                    'cbPageView': '@',
                    'receiveEvent': '@'
                },
                link: function(scope, iElement) {
                    scope.incPage = "";
                    scope.$on(scope.receiveEvent || 'pageViewer', function(event, data) {
                        scope.incPage = "";
                        if (data && data.page) {
                            console.log(data)
                            var ctrlName = data.page.replace(/^\//, '').split('/');
                            ctrlName = ctrlName[ctrlName.length - 1];
                            $timeout(function() {
                                require(["scripts/ctrl/" + data.page.replace(/^\//, '') + "Ctrl"], function(ctrl) {
                                    cbLazyRegister.controller(ctrlName + 'Ctrl', ctrl);

                                    scope.incPage = "views/" + data.page.replace(/^\//, '') + ".html";
                                    $rootScope.$apply();
                                });
                            }, 500);
                        }
                    });
                }
            };
        }];
});
