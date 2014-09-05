'use strict';
require.config({
    'paths': {
        'custModule': 'scripts/module',
        //services
        'iBranchServ': 'scripts/services/iBranchServ',
        'userServ': 'scripts/services/userServ',
        //modals
        'cbEjContextModal': 'scripts/modals/cabin-ejContextModal/cabin-ejContextModal',
        'cbOpenTxnModal': 'scripts/modals/cabin-openTxnModal/cabin-openTxnModal',
        'cbSupeviseModal': 'scripts/modals/cabin-supeviseModal/cabin-supeviseModal',
        'cbSupeviseRequireModal': 'scripts/modals/cabin-supeviseRequireModal/cabin-supeviseRequireModal',
        //validations
        'ACNOVal': 'scripts/validations/common/ACNOVal',
        'readMsr': 'scripts/validations/common/readMsr',
        'txn000045ACNOVal': 'scripts/validations/txn000045/txn000045ACNOVal',
        'txn120606ACNOVal': 'scripts/validations/txn120606/txn120606ACNOVal',
        'txn120606COPY': 'scripts/validations/txn120606/txn120606COPY',
    },
    'shim': {
        //service
        'custModule': ['libs'],
        'iBranchServ': ['custModule'],
        'userServ': ['custModule'],
        'cbEjContextModal': ['custModule'],
        'cbOpenTxnModal': ['custModule'],
        'cbSupeviseModal': ['custModule'],
        'cbSupeviseRequireModal': ['custModule']
    }
});

define([
    'custModule',
    'iBranchServ',
    'userServ',
    'cbEjContextModal',
    'cbOpenTxnModal',
    'cbSupeviseModal',
    'cbSupeviseRequireModal'
], function() {
    console.log('cabin-services-libs Initialized');
});
