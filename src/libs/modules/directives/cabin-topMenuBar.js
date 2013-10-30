'use strict';
define(['cabin'], function(cabin) {
    return ['$location', 'cabinModuleTemplatePath', '$http', '$rootScope', function($location, templatePath, $http, $rootScope) {
        return {
            templateUrl: templatePath + 'topMenuBar/topMenuBar.html',
            restrict: 'A',
            scope: {
                'cbTopMenuBar': '@',
                'reciveEvent' : '@',
                'emitEvent' : '@'
            },
            link: function(scope, iElement) {
                scope.current;
                scope.pages = [];
                scope.$on(scope.reciveEvent || 'topMenuBar', function(event, data) {
                    scope.pages = data.menus;
                });

                scope.navAndTrigger = function(page) {
                    if (new RegExp("^" + page.url +"(/|$)").test($location.path())) {
                        scope.current = page;
                        return 'active';
                    }
                    return '';
                };
                scope.$watchCollection("current", function(page) {
                    page && scope.$emit("broadcast", {
                        'event': scope.emitEvent || 'slideBar',
                        'menus': page || {}
                    });
                })
                scope.routeTo = function(url) {
                    $location.path(url);
                }
            }
        };
    }];
});
