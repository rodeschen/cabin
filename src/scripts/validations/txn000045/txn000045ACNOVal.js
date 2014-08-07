'use strict';
//txn120606ACNOVal
define(['cabin'], function(cabin) {
    return ['validation', ['value', 'allValue', 'ngModel',
        function(value, allValue, ngModel) {
            //var depart = !value ? "" : value.substring(3, 6);
            var depart2 = !value ? "" : value.substring(3, 5);
            if (!(/^(02|03|04|10|16|20|21|68|17|18)$/.test(depart2))) {
                return "限02,03,04,10,16,20,21,68,17,18科目";
            }
            return true;
        }
    ]];
});
