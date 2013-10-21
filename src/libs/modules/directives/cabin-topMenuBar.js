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
                //datas
                scope.pages = [];
                //test 

                $http.get('basehandler/queryMenu').success(function(data) {
                    scope.pages = data;
                });
                scope.navClass = function(page) {
                    return page.url == $location.path() ? 'active' : ''
                };

                scope.routeTo = function(page) {
                    $location.path(page.url);
                }
            }
        };
    }];
});
