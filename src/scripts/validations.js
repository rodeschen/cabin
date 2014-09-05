require.config({
    paths: {
        'taiwanId': 'libs/modules/validations/taiwanId',
       
"ACNOVal" : "scripts/validations/common/ACNOVal",
"readMsr" : "scripts/validations/common/readMsr",
"txn000045ACNOVal" : "scripts/validations/txn000045/txn000045ACNOVal",
"txn120606ACNOVal" : "scripts/validations/txn120606/txn120606ACNOVal",
"txn120606COPY" : "scripts/validations/txn120606/txn120606COPY"
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
