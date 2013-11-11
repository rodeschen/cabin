'use strict';
require.config({
    'paths': {
        'last': '../_httpMock/last',
        'queryMenu': '../_httpMock/queryMenu',
        'queryComboBox': '../_httpMock/queryComboBox'
    },
    'shim': {
        'last': ['cabin', 'app', 'queryMenu','queryComboBox']
    }
});

define(['last'], function() {
    console.log('test define loaded');
});
