'use strict';
require.config({
    paths: {
        'taiwanId': 'libs/modules/validations/taiwanId',
        'txnValidaions': ''
    },
    shim: {
        'taiwanId': ['cabin']
    }
});

define('cabin-libs', [

], function(libs, cabin) {
    console.log('cabin-core-libs Initialized');
});
