'use strict';
define([], function(cabin) {
    return ['$scope', 'properties', function sample2Ctrl($scope, properties) {
    	// $scope.test = function(){
    	// 	console.log($scope.xxx);
    	// }
    	$scope.show = function(aa){
    		alert(aa)
    	}
    	console.log("sampleCtrl")
    }];
});
