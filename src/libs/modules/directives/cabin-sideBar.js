'use strict';
define(['cabin'], function(cabin) {
    return ['$location', 'cabinModuleTemplatePath', '$http', '$timeout', function($location, templatePath, $http, $timeout) {
        return {
            templateUrl: templatePath + 'sideBar/sideBar.html',
            restrict: 'A',
            scope: {
                'cbSideBar': '@',
                'receiveEvent': '@',
                'emitEvent': '@'
            },
            link: function(scope, iElement) {
                scope.pages = [];
                scope.current;
                scope.currentGroup;
                scope.$on(scope.receiveEvent || 'slideBar', function(event, data) {
                    scope.currentGroup = data.menus;
                    emit("");
                    scope.pages = data.menus.child || [];

                });
                scope.navAndTrigger = function(page) {
                    if (new RegExp("^" + page.url + "$").test($location.path())) {
                        scope.current = page;
                        return 'active';
                    }
                    return '';
                };
                scope.$watchCollection("current", function(page) {
                    page && page.url && emit(page.url);
                })
                scope.routeTo = function(url) {
                    $location.path(url);
                }


                function emit(url) {
                    scope.$emit("broadcast", {
                        'event': scope.emitEvent || 'pageView',
                        'page': url || ""
                    });
                }
            }
        };
    }];
});
