'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn009199Ctrl', ['$scope', 'txn009199Serv', 'iBranchServ',
        function($scope, serv, iBranchServ) {
            // iBranchServ.send('009199').then(function(res) {
            //     angular.extend($scope.data, res.data);
            //     $scope.result = angular.fromJson(res.data['009199'].replace(/'/g, "\""));
            // });

            $scope.gridSettings = {
                height: 250,
                columns: [{
                    name: '未登出員工編號',
                    width: 140
                }, {
                    name: '姓名',
                    width: 140
                }]
            }
            $scope.cbank='012';
            $scope.result = [['00050121', '001user'], ['00050122', '002user']];
        }
    ]];

});
