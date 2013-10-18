'use strict';
require.config({
    paths: {
        'libs': 'libs/libs'
    }
});

define('cabin', ['libs'], function() {
    var otherModule = ['ngResource', 'ngSanitize', 'ui.bootstrap', 'ui.router', 'ui.utils'];
    if (properties.testMode) {
        otherModule = otherModule.concat(['ngMockE2E']);
    }
    var cabin = angular.module('cabin', otherModule);
    cabin.value("cabinModuleTemplatePath", properties.cabinModuleTemplatePath || "");
    cabin.value("properties", properties || {});
    console.log('cabin Initialized');
    return cabin;
});
