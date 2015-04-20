'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn075351Ctrl', ['$scope', '$sce', '$state', 'iBranchServ','userServ',
        function($scope, $sce, $state, iBranchServ,userServ) {

            // angular.extend($scope, {
            //     send: function(data) {
            //         if (data.INP_DATA) {
            //             $scope.result = [];
            //             $scope.name = '';
            //             iBranchServ.send("032671", data).then(function(data) {
            //                 $scope.name = data.data['name'];
            //                 $scope.result = angular.fromJson(data.data['032671'].replace(/'/g, "\""));

            //             });
            //         }
            //     }
            // });

            $scope.result = [
                ['0050012', '888801', '測試廣播測試訊息', '2015-04-14'],
                ['0060232', '888801', '全行通知', '2015-04-14']
            ];

            
            //$scope.add = function() {
            //   console.log("SSSS")
            //    $scope.result.push(['11', '22', '33', '44']);
            //}

            $scope.gridSettings = {
                height: 250,
                columns: [{
                    name: '傳送者員編',
                    width: 70
                }, {
                    name: '接收者員編',
                    width: 70
                }, {
                    name: '訊息',
                    width: 70
                }, {
                    name: '時間',
                    width: 70//,
                        // formatter: function(value, allValue) {
                        //     return $sce.trustAsHtml("連動000045交易");
                        // },
                        // click: function(value, allValue) {
                        //     $state.go('txnInit', {
                        //         'id': '000045',
                        //         'data': btoa(angular.toJson({
                        //             '110320_ACNO_SA': allValue[1],
                        //             '110320_NAME1': encodeURI($scope.name)
                        //         }))
                        //     });
                        // }
                }]
            };

        }
    ]];

});
