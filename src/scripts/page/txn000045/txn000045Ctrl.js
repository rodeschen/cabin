'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn000045Ctrl', ['$scope', 'txn000045Serv', '$q', '$timeout', '$resource','$filter',
        function($scope, serv, $q, $timeout, $resource,$filter) {
            angular.extend($scope, {
                getToday: function() {
                    return $filter('date')(new Date, 'yyyyMMdd');
                }
            });

        }
    ]];

});
