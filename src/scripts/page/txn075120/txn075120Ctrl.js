define(['cabin'], function(cabin) {
    return ['controller', 'txn075120Ctrl', ['$scope', '$q', '$timeout', '$resource', '$filter', 'iBranchServ', 'cbUtils', 'cbEjContextModal', 'userServ',
        function($scope, $q, $timeout, $resource, $filter, iBranchServ, cbUtils, cbEjContextModal, userServ) {

            $scope.gridSettings = {
                height: 250,
                columns: [{
                    name: '被代理人員編',
                    width: 70
                }, {
                    name: '代理人員編',
                    width: 70
                }, {
                    name: '起始日期',
                    width: 70
                }, {
                    name: '結束日期',
                    width: 70
                }]
            }

            $scope.memberInfo = [{
                    key: '00050019',
                    value: 'Matt'
                }, {
                    key: '00050020',
                    value: 'Max'
                }, {
                    key: '00050052',
                    value: 'Leon'
                }, {
                    key: '00050053',
                    value: 'Leo'
                }

            ];
            $scope.getToday = function() {
                return $filter('date')(new Date, 'yyyyMMdd');
            };
        }

    ]];
});
