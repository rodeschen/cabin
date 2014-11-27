'use strict';
require.config({
    'paths': {
        'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
        'last': '_httpMock/last',
        'queryMenu': '_httpMock/queryMenu',
        'queryComboBox': '_httpMock/queryComboBox',
        'iBranchTest': '_httpMock/iBranchTest'
    },
    'shim': {
        'angular-mocks': ['libs'],
        'last': ['angular-mocks','cabin', 'app', 'queryMenu', 'queryComboBox', 'iBranchTest']
    }
});

define(['cabin', 'app','libs', 'angular-mocks','queryMenu', 'queryComboBox', 'iBranchTest','last'], function() {
    console.log('test define loaded');
});
