'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn000001Ctrl', ['$scope', 'txn000001Serv', '$q', '$timeout', '$resource', '$filter', 'iBranchServ', 'cbUtils', 'cbEjContextModal', 'userServ',
        function($scope, serv, $q, $timeout, $resource, $filter, iBranchServ, cbUtils, cbEjContextModal, userServ) {
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

            $scope.user = userServ.getUser();

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
                    formatter: function(value) {
                        if (value == '110000') {
                            return '110220';
                        }
                        return value;
                    }
                }, {
                    name: '批號',
                    width: 50
                }, {
                    name: '交易序號',
                    width: 70
                }, {
                    name: '帳號',
                    width: 100
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
                    width: 70,
                    formatter: function(value) {
                        switch (value) {
                            case 'NC':
                                return '未完成';
                            case 'RJ':
                                return '失敗';
                            case 'AC':
                                return '成功';
                        }
                        return value;
                    }
                }, {
                    name: '授權主管代號',
                    width: 100
                }, {
                    name: 'EJ',
                    width: 70
                }, {
                    name: '幣別',
                    width: 70,
                    formatter: function() {
                        return '台幣';
                    }
                }, {
                    name: '交易型態',
                    width: 70,
                    formatter: function(value, allValue) {
                        switch (allValue[4]) {
                            case '110000':
                                return '轉收';
                            case '000045':
                                return '轉帳';
                            case '110320':
                                return '轉支';
                            case '120606':
                                return '現收';
                            case '0110':
                                return '一般';
                            case '0220':
                                return '一般';
                            case '032671':
                                return '查詢';
                            case '092661':
                                return '查詢';
                            case '092654':
                                return '查詢';
                        }
                        return '';
                    }
                }]
            }

        }
    ]];

});
