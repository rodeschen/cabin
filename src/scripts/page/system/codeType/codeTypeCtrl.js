'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'codeTypeCtrl', ['$scope','cbTxnRouterLoaderService', 'codeTypeServ', 'codeTypeServ2',
        function($scope , serv, serv2) {
            $scope.updated = {};
            $scope.data = {};
            $scope.update = function() {
                $scope.updated = angular.copy($scope.data);
            }
        }
    ]];

});

