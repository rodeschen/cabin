'use strict';
//txn120606ACNOVal
define(['cabin'], function(cabin) {
    return ['validation', ['value', 'allValue',
        function(value) {
            if (value && parseInt(value, 10) > 8) {
                return "最大值為 8";
            }
            return true;
        }
    ]];
});
