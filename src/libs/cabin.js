require.config({
    paths : {
      'libs': 'libs/libs'
    }
});

define('cabin', ['libs'], function() {
	var cabin = angular.module("cabin",['ngResource','ngSanitize']);
	console.log("cabin Initialized");
    return cabin;
});