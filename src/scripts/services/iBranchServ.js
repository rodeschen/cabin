'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'iBranchServ', ['$rootScope', '$http', '$q', 'cbDeviceAgentSrv',
        function($rootScope, $http, $q, cbDeviceAgentSrv) {

            return {
                send: function(txnId, data) {
                    data = data || {};
                    data.txnId = txnId;
                    var http = $http({
                        url: 'ibranch',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: data // $.param(data)
                    });

                    http.then(function() {
                        console.info("send " + txnId + " success");
                    }, function() {
                        console.error("send " + txnId + " error");
                    });
                    return http;
                }
            };
        }
    ]];
});
