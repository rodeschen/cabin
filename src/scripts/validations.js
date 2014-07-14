require.config({
    paths: {
        'taiwanId': 'libs/modules/validations/taiwanId',
       
"txn1206062Val" : "scripts/validations/txn120606/txn1206062Val",
"txn120606Val" : "scripts/validations/txn120606Val"
    },
    shim: {
        'taiwanId': ['cabin']
    }
});

define('txn-validations', ['cabin'], function(cabin) {
    var valids = {};
    // for (var index = 1; index < arguments.length; index++) {
    //     var modules = arguments[index];
    //     if (modules[0] == "validation") {
    //         valids[modules[1]] = modules[2];
    //     }
    // }
    cabin.value('defaultValidations', valids);
    console.log('default validations Initialized');
});
