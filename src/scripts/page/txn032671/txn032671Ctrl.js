'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn032671Ctrl', ['$scope', 'iBranchServ', '$sce', '$state',
        function($scope, iBranchServ, $sce, $state) {

            angular.extend($scope, {
                send: function(data) {
                    if (data.INP_DATA) {
                        $scope.result = [];
                        $scope.name = '';
                        iBranchServ.send("032671", data).then(function(data) {
                            $scope.name = data.data['name'];
                            $scope.result = angular.fromJson(data.data['032671'].replace(/'/g, "\""));

                        });
                    }
                }
            });

            $scope.gridSettings = {
                height: 250,
                columns: [{
                    name: '帳戶類別',
                    width: 70
                }, {
                    name: '帳戶號碼',
                    width: 70
                }, {
                    name: '120606',
                    width: 70,
                    formatter: function(value, allValue) {
                        return $sce.trustAsHtml("<div href=\"\">120606</div>");
                    },
                    click: function(value, allValue) {
                        $state.go('txnInit', {
                            'id': '120606',
                            'data': btoa(angular.toJson({
                                'ACNO_SA': allValue[1],
                                'IDNO': $scope.data.INP_DATA
                            }))
                        });
                    }
                }, {
                    name: '000045',
                    width: 70,
                    formatter: function(value, allValue) {
                        return $sce.trustAsHtml("<div >000045</div>");
                    },
                    click: function(value, allValue) {
                        $state.go('txnInit', {
                            'id': '000045',
                            'data': btoa(angular.toJson({
                                '110320_ACNO_SA': allValue[1]
                            }))
                        });
                    }
                }]
            };

        }
    ]];

});
