'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn000001Ctrl', ['$scope', 'txn000001Serv', '$q', '$timeout', '$resource', '$filter', 'iBranchServ', 'cbUtils', 'cbEjContextModal',
        function($scope, serv, $q, $timeout, $resource, $filter, iBranchServ, cbUtils, cbEjContextModal) {
            angular.extend($scope, {
                getToday: function() {
                    return $filter('date')(new Date, 'yyyyMMdd');
                },
                send: function(data) {
                    $scope.result = [];
                    iBranchServ.send("000001", data).then(function(data) {
                        $scope.result = angular.fromJson(data.data.dbresult.replace(/'/g, "\""));
                    });
                }
            });


            $scope.gridSettings = {
                height: 250,
                dblclick: function(data) {
                    iBranchServ.send("ejcontext", {
                        //showTelegrams: 'Y',
                        ejSeq: data[11],
                        buzDate: data[2]
                    }).then(function(res) {
                        cbEjContextModal.activate(res.data);
                    });

                },
                columns: [{
                    name: '交易行',
                    width: 70
                }, {
                    name: '員工編號',
                    width: 70
                }, {
                    name: '交易日期',
                    width: 70,
                    formatter: function(value) {
                        if (!value || value.length != 8) {
                            return;
                        }
                        return cbUtils.formatDate(cbUtils.convertAdAndTw(value), true);
                    }
                }, {
                    name: '交易時間',
                    width: 70
                }, {
                    name: '交易代號',
                    width: 70,
                }, {
                    name: '批號',
                    width: 400
                }, {
                    name: '交易序號',
                    width: 70
                }, {
                    name: '帳號(ID)',
                    width: 70
                }, {
                    name: '交易金額',
                    width: 70,
                    align: 'right',
                    formatter: function(value) {
                        value = value || 0;
                        return $filter('number')(parseFloat(value, 10), 2);
                    }
                }, {
                    name: '交易狀態',
                    width: 70
                }, {
                    name: '授權主管代號',
                    width: 100
                }, {
                    name: 'EJ',
                    width: 70
                }]
            }

        }
    ]];

});
