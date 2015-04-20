'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn009198Ctrl', ['$scope', '$sce', '$state', 'iBranchServ','userServ',
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

           /* $scope.result = [
                ['999', 'xx商業銀行', 'xx商銀', '台灣']
            ];

            $scope.lists = [{
                key: 'Taiwan',
                value: "台灣"
            }, {
                key: 'USA',
                value: '美國'
            }];*/
            
            //$scope.add = function() {
            //   console.log("SSSS")
            //    $scope.result.push(['11', '22', '33', '44']);
            //}

            /*$scope.gridSettings = {
                height: 250,
                columns: [{
                    name: '銀行別',
                    width: 70
                }, {
                    name: '銀行名稱',
                    width: 70
                }, {
                    name: '銀行簡稱',
                    width: 70
                }, {
                    name: '國　　別',
                    width: 70 //,*/
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
                //}]
            //};

        }
    ]];

});
