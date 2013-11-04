'use strict';
define(['cabin'], function(cabin) {
    return ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

        $scope.navClass = function(page) {
            if (new RegExp("^" + page.url).test($location.path())) {
                $rootScope.current = page;
                return 'active';
            }

            return '';
        }
    }];
});
