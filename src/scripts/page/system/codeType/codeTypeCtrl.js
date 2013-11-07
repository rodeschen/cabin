'use strict';
define(['cabin'], function(cabin) {
    return ['controller', 'codeTypeCtrl', ['$scope', 'codeTypeServ', '$q', '$timeout', '$resource',
        function($scope, serv, $q, $timeout, $resource) {
            $scope.updated = {};
            $scope.data = {};
            $scope.update = function() {
                $scope.updated = angular.copy($scope.data);
            }
            // $scope.xxx = function(){
            //  console.log("XXX")
            // }
            var a = $resource('basehandler/queryMenu');
            var aa = a.get();
            var b = a.get();
            console.log("XXXXXXXXXX", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx", b)
            console.log("XXxxxx",aa)
            console.log("AAA",b.menu)
            $timeout(function() {
                console.log("XXxxxx", b)
            }, 40)


        }
    ]];

});
