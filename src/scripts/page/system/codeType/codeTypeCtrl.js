'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'codeTypeCtrl', ['$scope', 'codeTypeServ', '$q', '$timeout', '$resource',
        function($scope, serv, $q, $timeout, $resource) {
            $scope.updated = {};
            $scope.data = {};
            $scope.update = function() {
                $scope.updated = angular.copy($scope.data);
            }

            $scope.ccc = function() {
               // $scope.data.locale = "ASDFADSF"
                $scope.data.locale = "zh_TW"
            }


        }
    ]];

});
