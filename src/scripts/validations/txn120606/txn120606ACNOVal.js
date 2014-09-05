'use strict';
//txn120606ACNOVal
define(['cabin'], function(cabin) {
    return ['value', 'allValue',
        function(value) {
            // if (!value) {
            //     return true;
            // }
            // if (!value) {
            //     return true;
            // }
            // if (!/^[0-9]{12}$/.test(value)) {
            //     return "帳號為12位數字"; // 解決itemValue.charAt(3) 會發生Exception
            // }

            // if (/^(7417|80172|80272)/.test(value)) {
            //     return true;
            // }

            // 帳號科目後三碼限168科目
            if (!/^[0-9]{3}168/.test(value)) {
                // CHECK1002 帳號科目後三碼限168科目
                return "黃金存摺帳號限168科目";
            }

            // var base = [6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
            // var values = value.split("");
            // var total = 0;
            // for (var i = 0; i < 11; i++) {
            //     total += (values[i] * base[i]);
            // }
            // var x = total % 11;
            // var checkNum;
            // console.log("aaa")
            // if (x == 0 || x == 1) {
            //     checkNum = 0;
            // } else {
            //     checkNum = 11 - x;
            // }

            // if (values[11] != checkNum) {
            //     return "檢查碼錯誤";
            // }

            return true;
        }
    ];
});
