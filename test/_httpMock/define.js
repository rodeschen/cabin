'use strict';
require.config({
    'paths': {
        'last': '../_httpMock/last',
        'queryMenu': '../_httpMock/queryMenu',
        'queryComboBox': '../_httpMock/queryComboBox',
        'iBranchTest': '../_httpMock/iBranchTest'
    },
    'shim': {
        'last': ['cabin', 'app', 'queryMenu', 'queryComboBox', 'iBranchTest']
    }
});

define(['last'], function() {
    console.log('test define loaded');
});
