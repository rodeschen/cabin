'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn092654Ctrl', ['$scope', 'txn092654Serv', 'iBranchServ',
        function($scope, serv, iBranchServ) {
            iBranchServ.send('092654').then(function(res) {
                angular.extend($scope.data, res.data);
                $scope.result = angular.fromJson(res.data['092661'].replace(/'/g, "\""));
            });

            $scope.gridSettings = {
                height: 250,
                columns: [{
                    name: '科子細目代號',
                    width: 70
                }, {
                    name: '金額類別',
                    width: 70
                }, {
                    name: '借方筆數',
                    width: 70
                }, {
                    name: '借方金額',
                    width: 70
                }, {
                    name: '貸方筆數',
                    width: 70,
                }, {
                    name: '貸方金額',
                    width: 70
                }]
            }
        }
    ]];

});
