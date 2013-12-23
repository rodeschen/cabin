'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbTest', ['$location', 'cabinModulePath', '$http', '$rootScope',
        function($location, cabinModulePath, $http, $rootScope) {
            return {
                templateUrl: cabinModulePath + 'directives/cabin-test/templates/test.html',
                restrict: 'A',
                // scope: {
                //     'cbTopMenuBar': '@',
                //     'receiveEvent': '@',
                //     'emitEvent': '@'
                // },
                replace: true,
                link: function(scope, iElement) {
                    
                }
            };
        }
    ]];
});
