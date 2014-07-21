'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn000001Ctrl', ['$scope', 'txn000001Serv', '$q', '$timeout', '$resource', '$filter', 'iBranchServ',
        function($scope, serv, $q, $timeout, $resource, $filter, iBranchServ) {
            $scope.$watchCollection('data', function(v) {
                console.log(v)

            });
            angular.extend($scope, {
                getToday: function() {
                    return $filter('date')(new Date, 'yyyyMMdd');
                },
                send: function(data) {
                    iBranchServ.send("000001", data).then(function(data) {
                        $scope.result = angular.fromJson(data.data.dbresult.replace(/'/g, "\""));
                    });
                }
            });
        }
    ]];

});
