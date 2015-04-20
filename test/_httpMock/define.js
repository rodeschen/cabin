'use strict';
require.config({
    'paths': {
        'angular-mocks': 'libs/components/angular-mocks/angular-mocks',
        'last': '_httpMock/last',
        'queryMenu': '_httpMock/queryMenu',
        'queryComboBox': '_httpMock/queryComboBox',
        'queryPhrase': '_httpMock/queryPhrase',
        'iBranchTest': '_httpMock/iBranchTest'
    },
    'shim': {
        'angular-mocks': ['libs'],
        'last': ['angular-mocks','cabin', 'app', 'queryMenu', 'queryComboBox', 'queryPhrase','iBranchTest']
    }
});

define(['cabin', 'app','libs', 'angular-mocks','queryMenu', 'queryComboBox', 'queryPhrase', 'iBranchTest','last'], function() {
    console.log('test define loaded');
});
