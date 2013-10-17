'use strict';
require.config({
    paths: {
        'libs': 'libs/libs'
    }
});

define('cabin', ['libs'], function() {
    var cabin = angular.module('cabin', ['ngResource', 'ngSanitize', 'ui.bootstrap', 'ui.router', 'ui.utils']);
    cabin.value("cabinModuleTemplatePath", properties.cabinModuleTemplatePath || "");
    cabin.value("properties", properties || {});
    console.log('cabin Initialized');
    return cabin;
});
