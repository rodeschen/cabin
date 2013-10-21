'use strict';
define(['cabin'], function(cabin) {
    return ['$location', 'cabinModuleTemplatePath', '$http', function($location, templatePath, $http) {
        return {
            templateUrl: templatePath + 'sideBar/sideBar.html',
            restrict: 'A',
            scope: {
                'cbSideBar': '@'
            },
            link: function(scope, iElement) {
                scope.menus = [];
                scope.$on(scope.cbSideBar, function(event, data) {
                    scope.menus = data.menus.child || [];
                });

                scope.click = function(menu) {
                    $location.path(menu.url || "");
                }
            }
        };
    }];
});
