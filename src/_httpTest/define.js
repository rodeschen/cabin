'use strict';
require.config({
    'paths': {
        'last': '../_httpTest/last',
        'queryMenu': '../_httpTest/queryMenu'
    },
    'shim': {
        'last': ['cabin', 'app', 'queryMenu']
    }
});

define(['last'], function() {
    console.log('test define loaded');
});
