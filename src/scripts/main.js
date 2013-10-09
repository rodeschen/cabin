'use strict';
require.config({
	urlArgs : 'cache=' + parseInt(Math.random() * 1000 , 10),
	baseUrl : '../',
	paths : {
		'libs': 'libs/libs',
		'cabin-libs': 'libs/cabin-libs',
		'app': 'scripts/app'

	},
	shim : {
		'cabin-libs' : ['libs'],
		'app': ['libs', 'cabin-libs']
	}
});

require(['libs','cabin-libs', 'app'], function() {
	console.log('init');
	var cabin = angular.module("cabin",['cbNotify','ngSanitize']).controller('cabinCtrl', ['$scope', function ($scope) {
		$scope.send  = function(data){
			$scope.$emit("broadcast",{
				'event': 'notify',
				'type' : $scope.type,
				'message' : data + 'SSS',
				'time' : new Date
			});
		};
		
	}]);
	
	cabin.run(['$rootScope', function($rootScope){
		$rootScope.$on("broadcast",function(ev, args){
			$rootScope.$broadcast(args.event, args);
		});
	}]);
	angular.bootstrap(window.document, ['cabin']);
});
