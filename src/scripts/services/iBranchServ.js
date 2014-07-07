'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'iBranchServ', ['$rootScope', '$http', '$q', '$injector',
        function($rootScope, $http, $q, $injector) {
            //cbDeviceAgentSrv, cbSupeviseRequireModal
            var funcs = {
                send: function(txnId, data) {
                    var txnData = {
                        'txnId': txnId,
                        'txnData': data
                    };
                    var http = $http({
                        url: '/iBranchApp/json',
                        method: 'POST',
                        responseType: 'JSON',
                        headers: {
                            //'Content-Type': 'application/x-www-form-urlencoded'
                            'Content-Type': 'text/plain;charset=UTF-8'
                        },
                        data: angular.toJson(txnData) // $.param(txnData)
                    });

                    http.then(function(xhr) {
                        console.log(txnId, "response", xhr.data);
                        var res = xhr.data;
                        if (res.txnStatus === '9') {
                            res.supevise.txnData = txnData;
                            var modal = $injector.get('cbSupeviseRequireModal');
                            funcs.sendMessage('error', '此交易需主管授權。');
                            modal.activate(res.supevise);
                        } else {
                            funcs.txnSuccess(res, txnData);
                        }
                        console.info("send " + txnId + " success");
                    }, function(xhr) {
                        console.log(xhr.data)
                        funcs.sendMessage('error', xhr.data.txnMessage);
                        console.error("send " + txnId + " error :" + xhr.data.txnMessage);
                    });
                    return http;
                },
                sendMessage: function(type, message) {
                    $rootScope.$broadcast('notify', {
                        event: 'notify',
                        type: type,
                        message: message
                    });
                },
                txnSuccess: function(txnData, sendData) {
                    if (txnData.txnStatus === '1') {
                        if (sendData.txnId == '0110') {
                            funcs.sendMessage('normal', '簽入完成。');
                        } else {
                            funcs.sendMessage('normal', '交易完成。');
                        }
                    }
                }
            };
            return funcs;
        }
    ]];
});
