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
});
