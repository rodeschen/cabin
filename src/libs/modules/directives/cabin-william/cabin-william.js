'use strict';
define(['cabin'], function(cabin) {
    return ['directive', 'cbWilliam', ['cabinModulePath', function(cabinModulePath) {
    	return {
    		templateUrl: cabinModulePath + 'directives/cabin-william/templates/william.html',
    		restrict: 'A',
    		link: function(scope) {
    			console.log('william directive init');
    			scope.navigate = function(page) {
    				console.log(page);
    			}
    		}
    	};
    }]];
});