'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn075350Ctrl', ['$scope', '$sce', '$state', 'iBranchServ','userServ',
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

            $scope.resultbranch = [
                ['011', 'ADMIN']
            ];

            $scope.resultmes =[
                ['00050060','00050031','全行通報','2015-04-14'],
                ['00068823','00073213','測試','2015-04-14']
            ];

            $scope.branchlist = [{
                key: '011',
                value: "永康分行"
            }, {
                key: '015',
                value: '桃園分行'
            }];

            $scope.rolelist = [{
                key: 'ADMIN',
                value: "主管"
            }];
            
            //$scope.add = function() {
            //   console.log("SSSS")
            //    $scope.result.push(['11', '22', '33', '44']);
            //}

            $scope.gridbranch = {
                height: 70,
                columns: [{
                    name: '分行別',
                    width: 70
                }, {
                    name: '角色',
                    width: 70
                //,
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
            $scope.gridmes = {
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
                    width: 70
                }]
            };

        }
    ]];

});
