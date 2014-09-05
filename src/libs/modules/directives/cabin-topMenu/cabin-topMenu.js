'use strict';
define(['cabinDirectivesModule'], function(cabinDirectivesModule) {
    cabinDirectivesModule.directive('cbTopMenu', ['$location', 'cabinModulePath', '$http', '$rootScope',
        function($location, cabinModulePath, $http, $rootScope) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-topMenu/templates/topMenu.html',
                restrict: 'A',
                scope: {
                    'cbTopMenuBar': '@',
                    'receiveEvent': '@',
                    'emitEvent': '@'
                },
                link: function(scope, iElement) {
                    scope.current;
                    scope.pages = [];
                    scope.$on(scope.receiveEvent || 'topMenu', function(event, data) {
                        scope.pages = data.menus;
                    });

                    scope.navAndTrigger = function(page) {
                        if (new RegExp("^" + page.url + "(/|$)").test($location.path())) {
                            scope.current = page;
                            return 'active';
                        }
                        return '';
                    };
                    scope.$watchCollection("current", function(page) {
                        page && scope.$emit("broadcast", {
                            'event': scope.emitEvent || 'sideBar',
                            'menus': page || {}
                        });
                    })
                    scope.routeTo = function(page) {
                        $location.path(page.url);
                    }
                }
            };
        }
    ]);
});
