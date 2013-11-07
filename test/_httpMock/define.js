'use strict';
require.config({
    'paths': {
        'last': '../_httpMock/last',
        'queryMenu': '../_httpMock/queryMenu'
    },
    'shim': {
        'last': ['cabin', 'app', 'queryMenu']
    }
});

define(['last'], function() {
    console.log('test define loaded');
});
