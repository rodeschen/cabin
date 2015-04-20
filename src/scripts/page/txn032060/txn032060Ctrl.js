'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn032060Ctrl', ['$scope', 'txn000045Serv', '$q', '$timeout', '$resource', '$filter', 'hotkey',
        function($scope, serv, $q, $timeout, $resource, $filter, hotkey) {


            $scope.cbank='011';
            $scope.empid='00050012';
            $scope.tdate='097/04/08';
            $scope.ttime='17:08';
            $scope.imoney='3,002,001';
            $scope.omoney='0';
            $scope.itmoney='0';
            $scope.otmoney='0';
            $scope.ibmoney='0';
            $scope.obmoney='0';
            $scope.yrmoney='-2,000';
            $scope.trmoney='3,002,001';
            $scope.tellermoney='3,002,001';
        }
    ]];

});
