'use strict';
require.config({
    'paths': {
        'cabinModalsModule': 'libs/modules/modals/module',
        'cbCommonModal': 'libs/modules/modals/cabin-commonModal/cabin-commonModal'
    },
    'shim': {
        'cbCommonModal': ['libs', 'cabinModalsModule']
    }
});

define([
	'cabinModalsModule',
    'cbCommonModal'
], function() {
    console.log('cabin-modals-libs Initialized');
});
