'use strict';
define(['cabin'], function(cabin) {
    return ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
        $http.get('basehandler/queryMenu').success(function(data) {
            $timeout(function() {
                $scope.$emit('broadcast', {
                    'event': 'topMenuBar',
                    'menus': data.menu
                });
            }, 500);
        });
    }];
});
