'use strict';
define(['cabin'], function(cabin) {
    return ['validation',
        function(value) {
            var res = false;
            if (/^[a-zA-Z](1|2)\d{8}$/i.test(value)) {
                value = value.toUpperCase();
                var area = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
                var sum = 0;
                var checkNum = value.substr(9, 1);
                sum = area.indexOf(value.substr(0, 1).toUpperCase()) + 10;
                sum = Math.floor(sum / 10) + (sum % 10 * 9);
                for (var i = 1; i < 9; i++) {
                    sum += value.substr(i, 1) * (9 - i);
                }
                var res = (((checkNum == 0) && checkNum == (sum % 10)) || ((checkNum != 0) && ((10 - (sum % 10)) == checkNum)));
            }
            if (!res) {
                return "身分証字號錯誤";
            }
            return true;
        }
    ];
});
