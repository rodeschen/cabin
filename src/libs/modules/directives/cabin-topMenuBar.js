'use strict';
define(['cabin'], function(cabin) {
    return ['$location', 'cabinModuleTemplatePath', '$http', function($location, templatePath, $http) {
        return {
            templateUrl: templatePath + 'topMenuBar/topMenuBar.html',
            restrict: 'A',
            scope: {
                'cbTopMenuBar': '@'
            },
            link: function(scope, iElement) {
                scope.pages = [];
                var currentPage;
                $http.get('basehandler/queryMenu').success(function(data) {
                    scope.pages = data;
                });
                scope.navClass = function(page) {
                    if (currentPage === page) {
                        return 'active';
                    }
                    return '';
                };

                scope.routeTo = function(page) {
                    scope.$emit("broadcast", {
                        'event': 'sideBar',
                        'menus': page || {}
                    });
                    currentPage = page;
                    $location.path(page.url);
                }
            }
        };
    }];
});
