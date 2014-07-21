'use strict';
define(['cabin'], function(cabin) {
    return ['validation', ['ngModel', 'allValue', 'cbDeviceAgentSrv', 'element',
        function(ngModel, allValue, cbDeviceAgentSrv, element) {
            cbDeviceAgentSrv.decode(true, "", "").then(function(data) {
                console.log('msrRed:',data);
                ngModel.putValue({
                    'ACNO_SA' : data.substr(1,10),
                    'PB_BAL' : data.substr(10,13),
                    'AMT1' : data.substr(13,10),
                    'PB_LINE': data.substr(23,3)
                });
            });
            return true;
        }
    ]];
});
