'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'webSocketCtrl', ['$scope',
        function($scope) {
            $scope.updated = {};
            $scope.data = {};
            $scope.update = function() {
                $scope.updated = angular.copy($scope.data);
            }
        }
    ]];


});
