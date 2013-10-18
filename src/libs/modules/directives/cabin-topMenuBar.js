'use strict';
define(['cabin'], function(cabin) {
    return ['$location', 'cabinModuleTemplatePath', function($location, templatePath) {
        return {
            //templateUrl: templatePath + 'notify/notify.html',
            templateUrl: templatePath + 'topMenuBar/topMenuBar.html',
            restrict: 'A',
            scope: {
                'cbTopMenuBar': '@'
            },
            link: function(scope, iElement) {
                //test 
                scope.pages = [{
                    url: '/txn/detail',
                    name: 'Detail'
                }, {
                    url: '/txn',
                    name: 'Txn'
                }, {
                    url: '/txn/sample/detail',
                    name: 'Sample/Detail'
                }, {
                    url: '/txn/sample/sample',
                    name: 'Sample/Sample'
                }];
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
