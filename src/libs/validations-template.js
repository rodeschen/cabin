require.config({
    paths: {
        'taiwanId': 'libs/modules/validations/taiwanId',
        'txnValidaions': ''
    },
    shim: {
        //'taiwanId': ['cabin']
    }
});

define('txn-validations', [
    'taiwanId'
], function() {
    console.log('default validations Initialized');
});
