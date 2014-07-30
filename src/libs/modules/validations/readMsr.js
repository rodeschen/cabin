'use strict';
define(['cabin'], function(cabin) {
    return ['validation', ['value', 'ngModel', 'allValue', 'cbDeviceAgentSrv', 'element',
        function(value, ngModel, allValue, cbDeviceAgentSrv, element) {
            if (value) return true;
            cbDeviceAgentSrv.decode(true, "", "").then(function(data) {
                console.log('msrRed:', data);
                var x = data;
                if (x.indexOf("A") != -1) {
                    x = x.substr(0, x.indexOf('A'));
                }
                x = x.replace(/:/g, '');

                if (x.length == 38) {
                    var pbAcno = x.substring(0, 12),
                        pbSerial = x.substring(12, 18),
                        pbBalance = x.substring(18, 29) + "." + x.substring(29, 31),
                        pbLineno = x.substring(31, 33),
                        pbCode = x.substring(33, 37),
                        pbCommon = x.substring(12, 18);
                    // String pbAcno = x.substring(0, 12);
                    // String pbSerial = x.substring(12, 18);
                    // String pbBalance = x.substring(18, 29) + "." + x.substring(30, 31);
                    // String pbLineno = x.substring(31, 33);
                    // String pbCode = x.substring(33, 37);
                    // String pbCommon = x.substring(12, 18);
                    // GaiaEttk.pnlPut(serNo, "ACNO_SA", pbAcno);
                    // GaiaEttk.pnlPut(serNo, "PB_NO", pbSerial);
                    // GaiaEttk.pnlPut(serNo, "PB_BAL", pbBalance);
                    // GaiaEttk.pnlPut(serNo, "PB_LINE", pbLineno);
                    // //                                      GaiaEttk.pnlPut(serNo, "", pbCode);
                    // //                                      GaiaEttk.pnlPut(serNo, "", pbCommon);

                    // GaiaEttk.pnlSetPatternUserAttr(serNo, "__MAGDATA", x);
                    // // TODO
                    // GaiaEttk.pnlValidateItem(serNo, "ACNO_SA");
                    // checkAllItemValues(GaiaEttk.pnlGetCurrentSerNo());
                    // removeAllItemValues(GaiaEttk.pnlGetCurrentSerNo());

                    // GaiaEttk.pnlUnlock(serNo);
                    // GaiaEttk.setFocus(GaiaEttk.FIRST_FIELD);
                    ngModel.putValue({
                        '110320_ACNO_SA': pbAcno,
                        '110320_PB_NO': pbSerial,
                        '110320_PB_BAL': pbBalance,
                        '110320_PB_LINE': pbLineno
                    });
                } else {
                    // GaiaClientCommonUtil
                    //     .showTxnMessage("存摺磁條有誤(帳號資料格式不正確)");
                    // continue;
                    console.error("存摺磁條有誤(帳號資料格式不正確)");
                }

            });
            return true;
        }
    ]];
});
