'use strict';
define(['cabin'], function(cabin) {
    return ['service', 'iBranchServ', ['$rootScope', '$http', '$q', '$injector', '$timeout', 'cbDeviceAgentSrv', '$filter',
        function($rootScope, $http, $q, $injector, $timeout, cbDeviceAgentSrv, $filter) {
            //cbDeviceAgentSrv, cbSupeviseRequireModal
            var funcs = {
                send: function(txnId, data, headerData) {
                    var testOV = "Y";
                    var sendData = angular.extend({
                        'txnId': txnId,
                        'txnData': data || {}
                    }, headerData || {});
                    console.log("send TxndId" + txnId);
                    if (txnId == '120606') {
                        sendData.txnData.TESTOV = testOV;
                    }
                    var http = $http({
                        url: '/iBranchApp/json',
                        method: 'POST',
                        responseType: 'JSON',
                        headers: {
                            //'Content-Type': 'application/x-www-form-urlencoded'
                            'Content-Type': 'text/plain;charset=UTF-8'
                        },
                        data: angular.toJson(sendData) // $.param(sendData)
                    });

                    http.then(function(xhr) {
                        console.log(txnId, "response", xhr.data);
                        var respData = xhr.data;
                        // if (respData.txnStatus === '9') {
                        //     respData.supevise.sendData = sendData;
                        //     var modal = $injector.get('cbSupeviseRequireModal');
                        //     funcs.sendMessage('error', '此交易需主管授權。');
                        //     modal.activate(respData.supevise);
                        // } else {
                        funcs.txnSuccess(respData, sendData);
                        //}
                        //console.info("send " + txnId + " success");
                    }, function(xhr) {
                        console.log(xhr.data)
                        funcs.sendMessage('error', txnId + " : " + xhr.data.txnMessage);
                        console.error("send " + txnId + " error :" + xhr.data.txnMessage);
                    });
                    return http;
                },
                sendMessage: function(type, message) {
                    console.log(message)
                    $rootScope.$broadcast('notify', {
                        event: 'notify',
                        type: type,
                        message: message
                    });
                },
                txnSuccess: function(respData, sendData) {
                    var status = respData.txnStatus;
                    var jobs = [];
                    if (respData.ACTIONCOUNT) {
                        for (var i = 0; i < respData.ACTIONCOUNT; i++) {
                            var job = respData['A' + i];
                            job.txnId = sendData.txnId;
                            jobs.push(job);
                        }
                    }
                    //append override jobs to end
                    if (status === '9') {
                        jobs.push({
                            txnId: sendData.txnId,
                            TYPE: 'SUP',
                            DATA: {
                                respData: respData,
                                sendData: sendData
                            }
                        });
                    }
                    if (status === '1') {
                        jobs.push({
                            txnId: sendData.txnId,
                            TYPE: 'MSG',
                            DATA: sendData.txnId == '0110' ? '簽入成功。' : '交易完成。'
                        });
                    }
                    funcs.executeJobs(jobs).finally(function() {
                        console.log("all jobs finish")
                    });
                },
                executeJobs: function(jobs) {
                    var defer = $q.defer();
                    if (jobs.length) {
                        var job = jobs.shift();
                        funcs.action(job).finally(function() {
                            if (jobs.length) {
                                funcs.executeJobs(jobs).finally(function() {
                                    defer.resolve();
                                });
                            } else {
                                defer.resolve();
                            }
                        });
                    } else {
                        defer.resolve();
                    }
                    return defer.promise;
                },
                action: function(job) {
                    var defer = $q.defer();
                    job.deferred = defer;
                    switch (job.TYPE) {
                        case 'POPUP':
                            // console.log("sPOPUP");
                            //return cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId);
                            break;
                        case 'PB':
                            console.log("sPB");
                            break;
                        case 'WARN':
                            console.log("sWARN");
                            break;
                        case 'CONFIRM':
                            // console.log("sCONFIRM");
                            //return cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId);
                            break;
                        case 'FORM':
                            // console.log("sFORM");
                            return cbDeviceAgentSrv.print(job.DATA, true, job.PROMPT, job.txnId);
                            break;
                        case 'MSR':
                            console.log("sMSR");
                            break;
                        case 'PDF':
                            console.log("sPDF");
                            //return cbDeviceAgentSrv.printWebPrinter(job.DATA, true, job.PROMPT, job.txnId);
                            break;
                        case 'MSG':
                            funcs.sendMessage('normal', '[' + job.txnId + '] ' + job.DATA);
                            break;
                        case 'SUP':
                            console.log("sSUP");
                            var modal = $injector.get('cbSupeviseRequireModal');
                            funcs.sendMessage('error', '[' + job.txnId + '] ' + '此交易需主管授權。');
                            modal.activate(job);
                            return defer.promise;
                            break;
                    }
                    $timeout(function() {
                        // console.log(job.TYPE, "AAA", job);
                        defer.resolve();
                    }, 1000);
                    return defer.promise;
                },
                queryEjContext: function(ejSeq, buzDate) {
                    return funcs.send("ejcontext", {
                        'ejSeq': ejSeq,
                        'buzDate': (buzDate || $filter("date")(new Date(), "yyyy/MM/dd"))
                    });
                }

            };


            //pooling supevise query
            (function querySup() {
                if ($rootScope.user && $rootScope.user.userId) {
                    funcs.send("querySup", {
                        userId: $rootScope.userId
                    }).then(function(xhr) {
                        console.log(xhr);
                        //if(xhr.data)
                    }).finally(function() {
                        $timeout(querySup, 1000);
                    });
                } else {
                    $timeout(querySup, 1000);
                };

            }) //();
            return funcs;
        }
    ]];
});
