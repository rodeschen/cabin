'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'txn120606Ctrl', ['$scope', 'txn120606Serv', '$q', '$timeout', '$resource',
        function($scope, serv, $q, $timeout, $resource) {
        	$scope.$watch("data.memo1",function(v){
        		console.log(v)
        	})
        }
    ]];

});
