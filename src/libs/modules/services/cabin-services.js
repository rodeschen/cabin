'use strict';
require.config({
    'paths': {
        'cabinServicesModule': 'libs/modules/services/module',
        'cbUtils': 'libs/modules/services/cabin-utils',
        'cbWebSocketIoServ': 'libs/modules/services/cabin-websocket-io',
        'cbDeviceAgent': 'libs/modules/services/cabin-deviceAgent/cabin-deviceAgent',
        'cbValidationServ': 'libs/modules/services/cabin-validation',
    },
    'shim': {
        //service
        'cbValidationServ': ['libs', 'cabinServicesModule'],
        'cbDeviceAgent': ['libs', 'cabinServicesModule'],
        'cbWebSocketIoServ': ['libs', 'cabinServicesModule'],
        'cbUtils': ['libs', 'cabinServicesModule']
    }
});

define([
    'cabinServicesModule',
    'cbValidationServ',
    'cbUtils',
    'cbWebSocketIoServ',
    'cbDeviceAgent'
], function() {
    console.log('cabin-services-libs Initialized');
});
