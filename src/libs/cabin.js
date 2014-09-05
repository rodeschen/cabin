'use strict';
require.config({
    paths: {
        'libs': 'libs/libs'
    }
});

define('cabin', ['libs', 'cabinCoreModule', 'cabinServicesModule','cabinModalsModule'], function() {
    var otherModule = [
        'oc.lazyLoad',
        //cabin
        'cabin-core',
        'cabin-services',
        'cabin-modals',
        'cabin-cust',
        'ngAnimate',
        'ui.router',
        'ngResource',
        'ngSanitize',
        'ui.bootstrap',
        'ui.utils',
        //'validation',
        'btford.socket-io',
        'btford.modal',
        'LocalStorageModule'

    ];
    if (properties.testMode) {
        otherModule = otherModule.concat(['ngMockE2E']);
    }
    var cabin = angular.module('cabin', otherModule);
    cabin.value("cabinModulePath", properties.cabinModulePath || "");
    cabin.value("properties", properties || {});
    console.log('cabin Initialized');
    return cabin;
});
